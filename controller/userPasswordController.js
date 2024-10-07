const userPassword = require('../model/userPasswordModel');

const handleUserPassword=async(req,res)=>{
    const {userEmail,password}=req.body;
    try{
        await userPassword.create({
            userEmail:userEmail,
            password:password
        });
    }catch(err){
        console.error(err);
    }
};

module.exports={
    handleUserPassword,
};
