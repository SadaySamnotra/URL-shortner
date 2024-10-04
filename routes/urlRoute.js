const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');

router.post('/url',urlController.handleGenerateNewShortURL);
router.get('/',(req,res)=>{
    res.render('home');
})
router.get('/:shortID',urlController.handleRedirect);

router.post('/analytics/:shortID',urlController.handleAnalytics);

module.exports=router;