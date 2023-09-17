const express=require('express');
const { registerUser, loginUser, profile, logoutUser, createPost, updatePost, getPosts, getPostById } = require('../controllers');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',profile);
router.post('/logout',logoutUser);
router.post('/post', uploadMiddleware.single('file'), createPost);
router.put('/post',uploadMiddleware.single('file'), updatePost);
router.get('/post',getPosts);
router.get('/post/:id',getPostById);

module.exports=router;