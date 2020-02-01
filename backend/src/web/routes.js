const express = require('express');


const routes = express.Router();


// ADMIN SYSTEM ROUTES
routes.get('/', (req, res)=> { res.render('login')});
routes.get('/index', (req, res)=> { 
    res.render('index', {page: 'pages/Dashboard/content'});
});

routes.get('/storeFuncionario', (req, res)=> { 
    res.render('index', { page: 'pages/Funcionario/store'});
});

routes.get('/gerenciarFuncionario', (req, res)=> { 
    res.render('index', { page: 'pages/Funcionario/gerenciarFuncionario'});
});



module.exports = routes;