const pool = require("../db/connection");

async function AddUserModel(name, email, password, address){
    try{
        const result = await pool.query('INSERT INTO usuarios (nome, email, senha, endereco) VALUES ($1, $2, $3, $4)', [name, email, password, address]);
        return result.rows[0];
    }
    catch(error){
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

async function PostUserModel(email,password){
    try{
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, password]);
        return result.rows[0];
    }
    catch(error){
        console.error('Erro ao consultar usuário:', error);
        throw error;
    }
}


module.exports = {
    AddUserModel,
    PostUserModel
}