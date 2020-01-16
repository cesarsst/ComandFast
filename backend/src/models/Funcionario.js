const mongoose = require('mongoose');


const FuncionarioSchema = new mongoose.Schema({
    cpf: Number,
    name: String,
    tel: String,
    ano_nasc: Date,
    user_name: String,
    password: String,
    level: Number
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);