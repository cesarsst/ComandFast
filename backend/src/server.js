const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://cesarsst:878795@cluster0-jl0x6.mongodb.net/ComandFast?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Conectado ao banco de dados!");
});

// Config moongoose
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(routes);
app.use(express.json());
app.use(cors());

app.listen(3000, ()=>{
    console.log('Servidor Online!');
})