const pool = require("../db/connection");

const addOrder = async (date, finalValue, userId, combinationId) => {
    try {
        const result = await pool.query("INSERT INTO pedidos (data, valor_total, id_usuario, id_combinacao) VALUES ($1, $2, $3, $4) RETURNING *", [date, finalValue, userId, combinationId]);
        console.log("Pedido criado com sucesso");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar pedido", error.message);
    }
};

module.exports = {
    addOrder
}