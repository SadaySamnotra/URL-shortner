const pool = require('../databasePG');

const create = async (data)=>{
    const {userEmail,password}= data;
    const userDetails = [userEmail,password];

    try{
        const query = `insert into "passwordTable"("userEmail",password) values($1,$2)`;
        const result = await pool.query(query,userDetails);
        if(!result){
            console.log("some internal error");
        }
    }catch(err){
        console.error(err);
    }
}

const findOne=async(data)=>{
    const {email,password}=data;

    try{
        const query = `select * from "passwordTable" where "userEmail" = $1`;
        const result = await pool.query(query,[email]);
        if(!result){
            console.log("The record with the email given does not exist");
            return null;
        }
        const storedPassword = result.rows[0].password;
        if(password===storedPassword){
            return result.rows[0];
        }
        return null;
    }catch(err){
        console.error(err);
    }
};

module.exports={
    create,
    findOne,
};