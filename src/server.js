const express = require('express');
const path = require('path');
const userRouter = require('./router/Users');
const orderRouter = require('./router/Orders');
const combinationRouter = require('./router//Combinations');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
app.get('/editarpedido', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public', 'editarpedido.html'));
});

app.use(express.json());
app.use('/api', combinationRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);




app.listen(8000, ()=>{
    console.log(`Servidor rodando na porta ${8000}`);
});