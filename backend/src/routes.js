const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const FuncionarioController = require('./controllers/FuncionarioController');
const EnderecoController = require('./controllers/EnderecoController');
const MesaController = require('./controllers/MesaController');
const CategoriaController = require('./controllers/CategoriaController');
const ProdutosController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');


// API ROUTES 

// Funcionarios Maneger Routes
routes.post('/registerNewFunc', FuncionarioController.store);
routes.post('/updateFunc', FuncionarioController.update);
routes.post('/searchFunc', FuncionarioController.search);
routes.get('/searchAllFunc', FuncionarioController.searchAll);
routes.delete('/deleteFunc', FuncionarioController.delete);

// Endereços Maneger Routes
routes.post('/registerEndereco', EnderecoController.store);
routes.put('/updateEndereco/:cpf', EnderecoController.update);

// Mesas Maneger Routes
routes.post('/registerMesa', MesaController.store);
routes.put('/searchMesa/:id_mesa', MesaController.search);
routes.get('/addNewMesa', MesaController.addNewMesa);
routes.delete('/deleteMesa/:id_mesa', MesaController.delete);

// Categoria Maneger Routes
routes.post('/registerCategoria', CategoriaController.store);
routes.get('/searchCategoria', CategoriaController.search);
routes.put('/updateCategoria/:id', CategoriaController.update);
routes.delete('/deleteCategoria/:id', CategoriaController.delete);

// Produtos Maneger Routes
routes.post('/registerProduto', upload.single('thumbnail'), ProdutosController.store);
routes.get('/searchProduto', ProdutosController.search);
routes.put('/updateProduto/:id', ProdutosController.update);
routes.delete('/deleteProduto/:id', ProdutosController.delete);

// Pedidos Maneger Routes
routes.post('/registerPedido', PedidoController.store);
routes.put('/searchPedido/:id', PedidoController.search);


module.exports = routes;