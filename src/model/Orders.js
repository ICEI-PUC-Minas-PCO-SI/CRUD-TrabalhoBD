const pool = require("../db/connection");

const addOrder = async (finalValue, userId, combinationId) => {
    try {
        const result = await pool.query("INSERT INTO pedidos (valor_total, id_usuario, id_combinacao) VALUES ($1, $2, $3) RETURNING *", [finalValue, userId, combinationId]);
        console.log("Pedido criado com sucesso Model");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar pedido Model", error.message );
    }
};

const getAllOrders = async() => {
    try {
        const result = await pool.query(`SELECT * FROM pedidos INNER JOIN usuarios ON pedidos.id_usuario = usuarios.id_usuario`);
        return result.rows;
    }catch(error) {
        console.error("Erro ao exibir todos os pedidos Model");
    }
};

const getUserOrdersById = async(userId) => {
    try {
        const result = await pool.query(`SELECT * FROM pedidos WHERE id_usuario = $1`, [userId]);
        return result.rows;
    }catch(error) {
        console.error(`Erro ao buscar pedidos do usuário ${userId}`, error.message);
    }
} 


const deleteOrderById = async (orderId) => {
    try {
        const result = await pool.query(`DELETE FROM pedidos WHERE id_pedido = $1`, [orderId]);
        //console.log(`Pedido ${orderId} deletado com sucesso Model`);
        return result.rows;
    } catch (error) {
        console.error(`Erro ao deletar pedido Model ${orderId} `, error.message);
    }
};

const updateOrderById = async (date, value,combinationId, orderId ) => {
    try {
        const result = await pool.query(`UPDATE pedidos SET data = $1, valor_total = $2, id_combinacao= $3 WHERE id_pedido = $4`, [date, value, combinationId, orderId]);
        console.log("Pedido editado com sucesso");
        return result.rows;
    } catch (error) {
        console.error(`Erro ao editar pedido ${orderId} `, error.message);
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    getUserOrdersById,
    deleteOrderById,
    updateOrderById
}