const pool = require('../databasePG');

const create = async(data)=>{
    const{shortID, redirectURL}=data;
    const values = [shortID,redirectURL];
    const query=
    `insert into urls("shortID", "redirectURL") 
    values($1,$2) returning *`;
    
    const result = await pool.query(query,values);
    return result.rows[0];
};

const findByShortID = async(shortID)=>{
    const result = await pool.query(`select * from urls where "shortID" = $1`,[shortID]);
    return result.rows[0];
};

const incrementVisit = async(shortID)=>{
    const query =  `
    insert into visit_history(url_id)
    values($1) returning *
    `;
    const result = await pool.query(query,[shortID]);
    return result.rows[0];
}

module.exports={
    create,
    findByShortID,
    incrementVisit,
};