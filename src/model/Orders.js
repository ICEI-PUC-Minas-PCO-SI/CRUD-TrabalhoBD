const pool = require("../db/connection");

const addOrder = async (finalValue, userId, combinationId) => {
    try {
        const result = await pool.query("INSERT INTO pedidos (valor_total, id_usuario, id_combinacao) VALUES ($1, $2, $3) RETURNING *", [finalValue, userId, combinationId]);
        console.log("Pedido criado com sucesso");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar pedido", error.message);
    }
};

const getAllOrders = async() => {
    try {
        const result = await pool.query(`SELECT *FROM pedidos`);
        return result.rows;
    }catch(error) {
        console.error("Erro ao exibir todos os pedidos Model");
    }
};

const deleteOrderById = async (orderId) => {
    try {
        const result = await pool.query(`DELETE FROM pedidos WHERE id_pedido = $1`, [orderId]);
        console.log(`Pedido ${orderId} deletado com sucesso`);
    } catch (error) {
        console.error(`Erro ao deletar pedido ${orderId} `, error.message);
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    deleteOrderById
}