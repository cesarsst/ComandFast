const mongoose = require('mongoose');


const MesaSchema = new mongoose.Schema({
    id_mesa: Number,
    status: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Mesa', MesaSchema);