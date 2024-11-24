const db = require('./db');

const userTable = `CREATE TABLE IF NOT EXISTS usuarios (
                        id_usuario TEXT PRIMARY KEY,
                        nome VARCHAR(255) NOT NULL,
                        endereco VARCHAR(200),
                        email VARCHAR(200) UNIQUE NOT NULL,
                        senha TEXT NOT NULL
                          );
                         `;

const orderTable = `CREATE TABLE IF NOT EXISTS pedidos (
                          id_pedido TEXT PRIMARY KEY,
                          data DATE,
                          valor_total DECIMAL,
                          id_usuario TEXT NOT NULL,
                          id_combinacao TEXT NOT NULL,
                          FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
                          FOREIGN KEY (id_combinacao) REFERENCES combinacoes(id_combinacao) ON DELETE CASCADE
                           );
                          `;

const combinationTable = `CREATE TABLE IF NOT EXISTS combinacoes (
                                id_combinacao TEXT PRIMARY KEY,
                                preco DECIMAL,
                                sabor_massa TEXT NOT NULL,
                                sabor_recheio TEXT NOT NULL,
                                tamanho TEXT NOT NULL,
                                descricao_decoracao TEXT NOT NULL
                                 );
                                `;

const createUser = `INSERT INTO usuarios (id_usuario, nome, endereco, email, senha) VALUES ($1, $2, $3, $4, $5)`;
const createOrder = `INSERT INTO pedidos (id_pedido, data, valor_total, id_usuario, id_combinacao) VALUES ($1, $2, $3, $4, $5)`;
const createCombination = `INSERT INTO combinacoes (id_combinacao, preco, sabor_massa, sabor_recheio, tamanho, descricao_decoracao) VALUES ($1, $2, $3, $4, $5, $6)`;

const updateOrder = `UPDATE pedidos SET email = $1 WHERE id_usuario = $2`;

const createTable = async(tableName) => {
    try{
        const validateTables = {
            'usuarios': userTable,
            'pedidos': orderTable,
            'combinacoes': combinationTable
        }
        if(!validateTables[tableName]) {
            throw new Error(`Nome ${tableName} é inválido`);
        }

        const tableExists = await checkTableExistence(tableName);
        if(tableExists) {
            throw new Error(`Tabela ${tableName} já existe`);
        }
        const result = await db.query(validateTables[tableName]);
        console.log(`Tabela ${tableName} criada com sucesso`);
    }catch(error) {
        console.error("Erro ao criar tabela", error);
    }
}

const checkTableExistence = async (tableName) => {
    const result = await db.query(`SELECT to_regclass($1);`, [tableName]);
    return result.rows[0].to_regclass !== null;
  };

  const addUser = async(user) => {
  const {userId, name, address, email, password} = user;
    try {
        const result = await db.query(createUser, [userId, name, address, email, password]);
        console.log("Usuário criado com sucesso");
        return result.rows[0];
    }catch(error) {
        console.error("Erro ao criar usuário", error);
    }
  }

  const addOrder = async(order) => {
  const {orderId, date, finalValue, userId, combinationId} = order;
    try {
        const result = await db.query(createOrder, [orderId, date, finalValue, userId, combinationId]);
        console.log("Pedido criado com sucesso");
        return result.rows[0];
    }catch(error) {
        console.error("Erro ao criar pedido", error.message);
    }
  };

  const addCombination = async(combination) => {
  const {combinationId, price, baseFlavour, fillingFlavour, decDescription, size} = combination;
    try {
        const result = await db.query(createCombination, [combinationId, price, baseFlavour, fillingFlavour, size, decDescription]);
        console.log("Combinação criada com sucesso");
        return result.rows[0];
    }catch(error) {
        console.error("Erro ao criar combinação", error);
    }
  }


