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

module.exports = {
    AddUserController
}