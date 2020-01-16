const mongoose = require('mongoose');


const MesaSchema = new mongoose.Schema({
    id_mesa: Number,
    status: Boolean

});

module.exports = mongoose.model('Mesa', MesaSchema);