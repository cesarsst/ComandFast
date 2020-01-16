const mongoose = require('mongoose');


const ProdutoSchema = new mongoose.Schema({
    id_product: Number,
    name: String,
    describe: String, 
    price: Number,
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }

});

module.exports = mongoose.model('Produto', ProdutoSchema);