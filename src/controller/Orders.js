const OrdersModel = require("../model/Orders");

async function getAllOrders(req, res) {
    try {
        const orders = await OrdersModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao recuperar pedidos:', error.message);
        res.status(500).json({ message: 'Erro no servidor ao recuperar pedidos controller.' });
    }
};

async function AddOrderController(req, res) {
    const {finalValue, userId, combinationId} = req.body;

    try{
        const Order = await OrdersModel.addOrder(finalValue, userId, combinationId);
        res.status(201).json(Order);
    }
    catch(error){
        res.status(500).json({ error: 'Erro ao criar pedido controller' });
    }
};

async function deleteOrderById(req, res) {
    const { id } = req.params;  // Acessa o parâmetro de rota
    console.log("ID no Controller: " + id);

    try {
        const order = await OrdersModel.deleteOrderById(id);
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado controller' });
        }
        res.status(200).json({ message: "Pedido excluído com sucesso controller", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir pedido controller' });
    }
}
;

module.exports = {
    AddOrderController, 
    getAllOrders, 
    deleteOrderById
}