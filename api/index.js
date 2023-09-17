const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const  router  = require('./routes/Route');



app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/',router);

mongoose.connect(process.env.MONGO_URL);


app.listen(process.env.PORT,()=>{
    console.log('Listening on PORT',process.env.PORT);
});

