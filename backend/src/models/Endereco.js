const mongoose = require('mongoose');


const EnderecoSchema = new mongoose.Schema({
    cpf: Number,
    num: Number,
    rua: String,
    bairro: String,
    cidade: String,
    estado: String
});

module.exports = mongoose.model('Endereco', EnderecoSchema);