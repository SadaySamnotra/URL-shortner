const express = require('express');
const URL = require('../model/urlModel');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/register',(req,res)=>{
    return res.render('signup');
});
router.get('/login',(req,res)=>{
    return res.render('login');
});

module.exports=router;