const mongoose = require('mongoose');


const MesaSchema = new mongoose.Schema({
    id_mesa: Number,
    status: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Mesa', MesaSchema);