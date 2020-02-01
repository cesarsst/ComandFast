const mongoose = require('mongoose');


const ProdutoSchema = new mongoose.Schema({
    thumbnail: String,
    id_product: Number,
    name: String,
    describe: String, 
    price: Number,
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
}, {
    toJSON:{
        virtuals: true,
    }
});

ProdutoSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.103:3000/files/${this.thumbnail}`
});

module.exports = mongoose.model('Produto', ProdutoSchema);