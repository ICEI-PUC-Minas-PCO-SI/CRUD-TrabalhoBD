const db = require('./db');

const userTable = `CREATE TABLE IF NOT EXISTS usuarios (
                        id_usuario SERIAL PRIMARY KEY,
                        nome VARCHAR(255) NOT NULL,
                        endereco VARCHAR(200),
                        email VARCHAR(200) UNIQUE NOT NULL,
                        senha TEXT NOT NULL
                          );
                         `;

const orderTable = `CREATE TABLE IF NOT EXISTS pedidos (
                          id_pedido SERIAL PRIMARY KEY,
                          data TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                          valor_total DECIMAL,
                          id_usuario INT NOT NULL,
                          id_combinacao INT NOT NULL,
                          FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
                          FOREIGN KEY (id_combinacao) REFERENCES combinacoes(id_combinacao) ON DELETE CASCADE
                           );`
                           ;

const combinationTable = `CREATE TABLE IF NOT EXISTS combinacoes (
                                id_combinacao SERIAL PRIMARY KEY,
                                preco DECIMAL,
                                sabor_massa TEXT NOT NULL,
                                sabor_recheio TEXT NOT NULL,
                                tamanho TEXT NOT NULL,
                                descricao_decoracao TEXT NOT NULL
                                 );
                                `;

const selectAllOrders = `SELECT *FROM pedidos`;                                

const createUser = `INSERT INTO usuarios (id_usuario, nome, endereco, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const createOrder = `INSERT INTO pedidos (valor_total, id_usuario, id_combinacao) VALUES ($1, $2, $3) RETURNING *`;
const createCombination = `INSERT INTO combinacoes (id_combinacao, preco, sabor_massa, sabor_recheio, tamanho, descricao_decoracao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

const updateOrder = `UPDATE pedidos
                     SET
                        data = $1,
                        valor_total = $2
                        WHERE id_pedido = $3
                    `
const deleteOrder = `DELETE FROM pedidos WHERE id_pedido = $1`;

const selectCombinationId = `SELECT id_combinacao
      FROM combinacoes
      WHERE sabor_massa = $1
        AND sabor_recheio = $2
        AND tamanho = $3
        AND descricao_decoracao = $4;
    `;

const getUserOrders = `SELECT * FROM pedidos WHERE id_usuario = $1;`;

const getUserOrdersById = async(userId) => {
    try {
        const result = await db.query(getUserOrders, [userId]);
        return result.rows;
    }catch(error) {
        console.error(`Erro ao buscar pedidos do usuário ${userId}`, error.message);
    }
} 

const createTable = async (tableName) => {
    try {
        const validateTables = {
            'usuarios': userTable,
            'pedidos': orderTable,
            'combinacoes': combinationTable
        }
        if (!validateTables[tableName]) {
            throw new Error(`Nome ${tableName} é inválido`);
        }

        const tableExists = await checkTableExistence(tableName);
        if (tableExists) {
            throw new Error(`Tabela ${tableName} já existe`);
        }
        const result = await db.query(validateTables[tableName]);
        console.log(`Tabela ${tableName} criada com sucesso`);
    } catch (error) {
        console.error("Erro ao criar tabela", error.message);
    }
};

const checkTableExistence = async (tableName) => {
    const result = await db.query(`SELECT to_regclass($1); `, [tableName]);
    return result.rows[0].to_regclass !== null;
};

const addUser = async (user) => {
    const { userId, name, address, email, password } = user;
    try {
        const result = await db.query(createUser, [userId, name, address, email, password]);
        console.log("Usuário criado com sucesso");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar usuário", error.message);
    }
};

const addOrder = async (order) => {
    const { orderId, date, finalValue, userId, combinationId } = order;
    try {
        const result = await db.query(createOrder, [finalValue, userId, combinationId]);
        console.log("Pedido criado com sucesso");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar pedido", error.message);
    }
};

const addCombination = async (combination) => {
    const { combinationId, price, baseFlavour, fillingFlavour, decDescription, size } = combination;
    try {
        const result = await db.query(createCombination, [combinationId, price, baseFlavour, fillingFlavour, size, decDescription]);
        console.log("Combinação criada com sucesso");
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar combinação", error.message);
    }
};

const deleteOrderById = async (orderId) => {
    if (!checkIfExists) return;
    try {
        const result = await db.query(deleteOrder, [orderId]);
        console.log(`Pedido ${orderId} deletado com sucesso`);
    } catch (error) {
        console.error(`Erro ao deletar pedido ${orderId} `, error.message);
    }
};

const updateOrderById = async (date, value, orderId) => {
    if (!checkIfExists) return;
    try {
        const result = await db.query(updateOrder, [date, value, orderId]);
        console.log("Pedido editado com sucesso");
    } catch (error) {
        console.error(`Erro ao editar pedido ${orderId} `, error.message);
    }
};

const checkIfExists = async (tableName, idColumns, idValue) => {
    try {
        const query = `SELECT 1 FROM ${tableName} WHERE ${idColumns} = $1 LIMIT 1`;
        const result = await db.query(query, [idValue]);
        console.log("Elemento encontrado");
        return result.rowCount > 0;
    } catch (error) {
        console.error(`Erro ao verificar a existência do elemento na tabela ${tableName} `, error.message);
    }
};

const checkCombination = async (base, filling, size, description) => {
    try {
        const result = await db.query(selectCombinationId, [base, filling, size, description]);
    } catch (error) {
        console.error("Erro ao buscar combinação", error.message);
    }
};

const getAllOrders = async() => {
    try {
        const result = await db.query(selectAllOrders);
        return result.rows;
    }catch(error) {
        console.error("Erro ao exibir todos os pedidos");
    }
}
