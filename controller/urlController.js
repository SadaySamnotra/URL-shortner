const shortid = require("shortid");
const URL=require('../model/urlModel');
const pool = require('../databasePG');

async function handleGenerateNewShortURL(req,res){
    const {url}=req.body;
    if(!url) return res.status(400).json({error:"URL is needed"});

    const shortIDgen = shortid.generate(8);
    const newURL= await URL.create({
        shortID:shortIDgen,
        redirectURL:url,
        visitHistory:[],
    });
    return res.status(201).json({newURL:`http://localhost:5500/${shortIDgen}`});
}

const handleRedirect = async(req,res)=>{
    const {shortID} = req.params;
    const urlRecord = await URL.findByShortID(shortID);

    if(!urlRecord) return res.status(404).send('URL not found.');

    await URL.incrementVisit(shortID);
    return res.redirect(urlRecord.redirectURL);
};

const handleAnalytics = async(req,res)=>{
    const {shortID} = req.params;
    const urlRecord = await URL.findByShortID(shortID);

    if(!urlRecord) return res.status(404).json({error:"URL not found"});

    const visitHistory = await pool.query(`select * from visit_history where url_id = $1`,[shortID]);
    return res.json({
        totalClicks:visitHistory.rowCount,
        visitHistory:visitHistory.rows,
    })
};

module.exports={
    handleGenerateNewShortURL,
    handleRedirect,
    handleAnalytics,
};