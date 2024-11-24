const OrdersModel = require("../model/Orders");

async function AddOrderController(req, res) {
    const {finalValue, userId, combinationId} = req.body;

    try{
        const Order = await OrdersModel.addOrder(finalValue, userId, combinationId);
        res.status(201).json(Order);
    }
    catch(error){
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
}

module.exports = {
    AddOrderController
}