const mongoose = require('mongoose');


const ComandaSchema = new mongoose.Schema({
    id_comanda: {
        type: Number,
        default: 0
    },
    mesa: Number,
    status: {
        type: Boolean,
        default: true
    },
    pedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        default: null
    }],
    total: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Comanda', ComandaSchema);


