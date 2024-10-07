const User = require('../model/userModel');
const Password=require('../model/userPasswordModel');
const {v4:uuidv4}=require('uuid');
const{setUser}=require('../service/userAuth');

const handleUserSignup= async(req,res)=>{
    const {firstName,lastName,email,gender,age,city,password}=req.body;
    let user = null;
    try{
        user = await User.create({
            first_name:firstName,
            last_name:lastName,
            userEmail:email,
            userGender:gender,
            userAge:age,
            userCity:city,
        });
        console.log("USER",user);
        if(user){
            console.log(password);
            const passwordEntry=await Password.create({
                userEmail:email,
                password:password
            });
            console.log('Password table entry done',passwordEntry);
        }
    }catch(err){
        console.error(err);
    }
    res.redirect('/');
};

const handleUserLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user = await Password.findOne({email,password});
    if(!user || user===null){
        return res.render('login',{
            error:"Please enter correct credentials",
        })
    }
    const sessionID = uuidv4();
    setUser(sessionID,user);
    res.cookie('uid',sessionID);
    return res.redirect('/generateURL');
};

module.exports={
    handleUserSignup,
    handleUserLogin,
};