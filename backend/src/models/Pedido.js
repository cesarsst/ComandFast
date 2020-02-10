const mongoose = require('mongoose');


const PedidoSchema = new mongoose.Schema({
    id_pedido: Number,
    date: Date,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }],
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa'
    },
    comanda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comanda'
    },
    status: {
        type: Boolean,
        default: true
    }
    
});

module.exports = mongoose.model('Pedido', PedidoSchema);