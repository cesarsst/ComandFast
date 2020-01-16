const mongoose = require('mongoose');


const CategoriaSchema = new mongoose.Schema({
    id_categorie: Number,
    name: String,

});

module.exports = mongoose.model('Categoria', CategoriaSchema);