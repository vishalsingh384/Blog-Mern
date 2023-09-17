const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/Post');
const secretKey=process.env.JWT_SEC_KEY;

const salt = bcrypt.genSaltSync(10);

exports.registerUser=async (req, res) => {
    console.log('hi');
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
};

exports.loginUser=async (req, res) => {
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
};

exports.profile=(req, res) => {
    try{
        const { token } = req.cookies;
        jwt.verify(token, secretKey, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        })
    }catch(err){
        res.json(err.message);
    }
};

exports.logoutUser=(req, res) => {
    res.cookie('token', '').json('Logout Success');
};

exports.createPost=async (req, res) => {
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
};

exports.updatePost= async (req, res) => {
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

};


exports.getPosts=async (req, res) => {
    try{
        const resp = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);
        
        res.json(resp);
    }catch(err){
        res.json(err.message);
    }
};

exports.getPostById=async (req, res) => {
    const resp = await Post.findOne({ _id: req.params.id }).populate('author', ['username']);
    res.json(resp);
};


