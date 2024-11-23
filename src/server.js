const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

app.use(express.json());
app.listen(8000, ()=>{
    console.log(`Servidor rodando na porta ${8000}`);
});