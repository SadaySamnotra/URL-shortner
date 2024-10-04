require('dotenv').config();
const express=require('express');
const app = express();
const urlRouter = require('./routes/urlRoute');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',urlRouter);

const PORT = 5500;

app.listen(PORT,()=>{
    console.log(`Server is running at the port: ${PORT}`);
});