const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');
const {restrictToLoggedinUserOnly}=require('../middleware/restrictLogin');

router.get('/generate',restrictToLoggedinUserOnly,(req,res)=>{
    res.render('generateURL');
});
router.post('/',restrictToLoggedinUserOnly,urlController.handleGenerateNewShortURL);
router.get('/',restrictToLoggedinUserOnly,urlController.handleAllURLS);
router.get('/:shortID',urlController.handleRedirect);



module.exports=router;