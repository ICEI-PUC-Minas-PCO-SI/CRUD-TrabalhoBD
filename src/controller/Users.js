const UserModel = require("../model/Users");

async function AddUserController(req, res) {
    const {name, email, password, address} = req.body;

    try{
        const User = await UserModel.AddUserModel(name, email, password, address);
        res.status(201).json(User);
    }
    catch(error){
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

async function PostUserController(req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    try{
        const User = await UserModel.PostUserModel(email, password);
        res.status(200).json(User);
    }
    catch(error){
        res.status(401).json({ error: 'Erro ao puxar usuário' });
    }
}

module.exports = {
    AddUserController,
    PostUserController
}