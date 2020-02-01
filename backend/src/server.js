const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const routesWeb = require('./web/routes');
const app = express();

mongoose.connect('mongodb+srv://cesarsst:878795@cluster0-jl0x6.mongodb.net/ComandFast?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Conectado ao banco de dados!");
});

// Config moongoose
mongoose.set('useFindAndModify', false);

// Config EJS enginer
app.set('view engine', 'ejs');
app.set('views', './src/web/views');


// Configurando arquivos estaticos API

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/files", express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);
app.use(express.json());
app.use(cors());

// Configurando arquivos estaticos WEB
app.use(express.static('./src/web/public'));
app.use(routesWeb);


app.listen(3000, ()=>{
    console.log('Servidor Online!');
})