const mongoose = require('mongoose');


const EnderecoSchema = new mongoose.Schema({
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario'
    },
    num: Number,
    rua: String,
    bairro: String,
    cidade: String,
    estado: String
});

module.exports = mongoose.model('Endereco', EnderecoSchema);