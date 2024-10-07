const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');

router.post('/',urlController.handleGenerateNewShortURL);
router.get('/',urlController.handleAllURLS);
router.get('/:shortID',urlController.handleRedirect);



module.exports=router;