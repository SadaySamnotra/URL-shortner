const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');
const {restrictToLoggedinUserOnly}=require('../middleware/restrictLogin');



router.post('/',restrictToLoggedinUserOnly,urlController.handleGenerateNewShortURL);
router.get('/',urlController.handleAllURLS);
router.get('/:shortID',urlController.handleRedirect);
router.get('/dashboard',restrictToLoggedinUserOnly,(req,res)=>{
    res.render('dashboard');
});



module.exports=router;