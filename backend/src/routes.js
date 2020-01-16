const express = require('express');
const routes = express.Router();


const FuncionarioController = require('./controllers/FuncionarioController');

// Rotas referente a entidade Funcionarios
routes.post('/registerNewFunc', FuncionarioController.store);
routes.put('/updateFunc', FuncionarioController.update);
routes.get('/searchFunc', FuncionarioController.search);
routes.delete('/deleteFunc', FuncionarioController.delete);



module.exports = routes;