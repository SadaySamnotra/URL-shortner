const pool = require('../databasePG');

const create = async(data)=>{
    
    const {first_name,last_name,userEmail,userGender,userAge,userCity}=data;
    const userData = [first_name,last_name,userEmail,userGender,userAge,userCity];
    try{
        const query = `insert into users(first_name,last_name,email,gender,age,city) 
            values($1,$2,$3,$4,$5,$6) returning *`
        const result = await pool.query(query,userData);
        if(!result){
            console.log("Some error in returing the values, please check your data again");
            return result;
        }
        console.log(result.rows[0]);
        return result.rows[0];
    }catch(err){
        console.error(err.message);
    };
};

module.exports={
    create,
};