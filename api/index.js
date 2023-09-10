const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
const Post = require('./models/Post');

const salt = bcrypt.genSaltSync(10);
const secretKey = 'iwrupfjqnwer7y034sdfkjvn';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://blog_blog:Vishal1234@cluster0.qrts7ms.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const UserDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(UserDoc);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const UserDoc = await User.findOne({ username });
        if (UserDoc) {
            const passOk = bcrypt.compareSync(password, UserDoc.password);
            if (passOk) {
                jwt.sign({ username, id: UserDoc._id }, secretKey, {}, (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.cookie('token', token).json({
                            id: UserDoc._id,
                            username
                        });
                    }
                });
            } else {
                res.status(400).json('Wrong Credentials')
            }
        } else {
            res.status(404).json('Username not found');
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logout Success');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;

    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) throw err;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });

        res.json(postDoc)
    })
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body;
        
        const postDoc = await Post.findById(id);
        // if(!postDoc) return res.status(404).json('Post Not found');

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if (!isAuthor) {
            return res.status(400).json('Not Authorized');
        }

        
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        });

        res.json(postDoc);

    });

});


app.get('/post', async (req, res) => {
    const resp = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);

    res.json(resp);
})

app.get('/post/:id', async (req, res) => {
    const resp = await Post.findOne({ _id: req.params.id }).populate('author', ['username']);
    res.json(resp);
})



app.listen(4000);

