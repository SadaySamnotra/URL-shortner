const shortid = require("shortid");
const URL=require('../model/urlModel');
const pool = require('../databasePG');

async function handleGenerateNewShortURL(req,res){
    const {url}=req.body;
    if(!url) return res.status(400).json({error:"URL is needed"});

    const shortIDgen = shortid.generate(8);
    await URL.create({
        shortID:shortIDgen,
        redirectURL:url,
    });
    return res.status(201).json({newURL:`http://localhost:5500/${shortIDgen}`});
}

const handleRedirect = async(req,res)=>{
    const {shortID} = req.params;
    const urlRecord = await URL.findByShortID(shortID);

    if(!urlRecord) return res.status(404).send('URL not found.');

    await URL.redirectPage(shortID);
    return res.redirect(urlRecord.redirectURL);
};


const handleAllURLS=async(req,res)=>{
    const result = await URL.getAllURLS();
    if(!result) return res.status(404).json({error:"Internal server error cannot fetch any urls at the moment"});
    res.render('urlTable',{result});
};

module.exports={
    handleGenerateNewShortURL,
    handleRedirect,
    handleAllURLS,
};