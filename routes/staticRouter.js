const express = require('express');
const URL = require('../model/urlModel');
const router = express.Router();

router.get('/',(req,res)=>{
    return res.render('home');
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
});
router.get('/login',(req,res)=>{
    return res.render('login');
});
router.get('/generateURL',(req,res)=>{
    return res.render('generateURL');
})

module.exports=router;