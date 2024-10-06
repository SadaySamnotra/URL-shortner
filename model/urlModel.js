const pool = require('../databasePG');

const create = async(data)=>{
    const{shortID, redirectURL}=data;
    const values = [shortID,redirectURL];
    const query=
    `insert into urls("shortID", "redirectURL") 
    values($1,$2) returning *`;
    
    const result = await pool.query(query,values);
    console.log(result);
    console.log(result.rows[0]);
    return result.rows[0];
};

const findByShortID = async(shortID)=>{
    const result = await pool.query(`select * from urls where "shortID" = $1`,[shortID]);
    return result.rows[0];
};

const redirectPage= async (shortID)=>{
    try{
        const result = await pool.query(
            `select * from visit_history where url_id=$1`
            ,[shortID]);
        if (result.rows.length===0){
            await pool.query(
                `insert into visit_history(url_id,clicks) values($1,$2)`,
                [shortID,1]
            );
        }else{
            await incrementVisit(shortID);
        }
    }catch(err){
        console.error('Error in redirectPage: ',err);
    }
};

const incrementVisit = async(shortID)=>{
    const result = await pool.query
    (`select clicks from visit_history where url_id= $1`,[shortID]);
    let clicks = result.rows[0].clicks;
    clicks++;
    await pool.query(`update visit_history set clicks = $1 where url_id=$2`,[clicks,shortID]);
    return clicks;
}

const getAllURLS=async ()=>{
    try{
        const result = await pool.query(`
            select u."redirectURL",u."shortID",v.clicks
            from urls u
            left join visit_history v
            on u."shortID" = v.url_id
            `);
        return result.rows;
    }catch(err){
        console.error("Internal server error",err);
        throw err;
    };
};



module.exports={
    create,
    findByShortID,
    incrementVisit,
    getAllURLS,
    redirectPage,
};