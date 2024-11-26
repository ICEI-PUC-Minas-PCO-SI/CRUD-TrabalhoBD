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

async function getUserOrdersById(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const orders = await OrdersModel.getUserOrdersById(id);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao recuperar pedidos controller:', error.message);
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
};

async function updateOrderById(req, res) {
    const { data, finalValue, combinationId } = req.body;
    const { id } = req.params;

    console.log(`Atualizando pedido com ID: ${data}`);

    // Validação básica
    if (!id || !finalValue || !data || !combinationId) {
        return res.status(400).json({ error: 'Dados incompletos para atualizar o pedido.' });
    }

    try {
        const updatedOrder = await OrdersModel.updateOrderById(data, finalValue, combinationId, id);

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }

        res.status(200).json({ message: 'Pedido atualizado com sucesso.', id: updatedOrder });
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar pedido.' });
    }
}

module.exports = {
    AddOrderController, 
    getAllOrders, 
    getUserOrdersById,
    deleteOrderById,
    updateOrderById
}