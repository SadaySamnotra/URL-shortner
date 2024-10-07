require('dotenv').config();
const express=require('express');
const app = express();
const urlRouter = require('./routes/urlRoute');
const userRouter = require('./routes/userRouter'); 
const staticRouter = require('./routes/staticRouter');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly}=require('./middleware/restrictLogin');

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/',staticRouter);
app.use('/url',restrictToLoggedinUserOnly,urlRouter);
app.use('/user',userRouter);

const PORT = 5500;

app.listen(PORT,()=>{
    console.log(`Server is running at the port: ${PORT}`);
});