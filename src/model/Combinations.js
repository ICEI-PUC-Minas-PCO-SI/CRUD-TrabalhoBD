const pool = require("../db/connection");

const checkCombination = async (base, filling, size, description) => {
    const selectCombinationId = `SELECT id_combinacao, preco 
      FROM combinacoes
      WHERE sabor_massa = $1
        AND sabor_recheio = $2
        AND tamanho = $3
        AND descricao_decoracao = $4`;
    try {
        const result = await pool.query(selectCombinationId, [base, filling, size, description]);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao buscar combinação", error.message);
    }
};

module.exports = {
    checkCombination
}