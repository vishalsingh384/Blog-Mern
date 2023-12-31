const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const  router  = require('./routes/Route');



app.use(cors({ credentials: true, origin: 'https://650720885ed2ae4e5d28cc9b--magical-tarsier-517b14.netlify.app' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/',router);

mongoose.connect(process.env.MONGO_URL);


app.listen(process.env.PORT,()=>{
    console.log('Listening on PORT',process.env.PORT);
});

