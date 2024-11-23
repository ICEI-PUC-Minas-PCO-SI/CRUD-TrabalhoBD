const pool = require("../db/connection");

async function AddUserModel(name, email, password, address){
    try{
        const result = await pool.query('INSERT INTO usuario (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, address]);
        return result.rows[0];
    }
    catch(error){
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

module.exports = {
    AddUserModel
}