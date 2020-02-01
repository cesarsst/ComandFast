const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');

module.exports = {


    async store(req, res){

        const { filename } = req.file;
        const { name, describe, price, categorie } = req.body;

        const categoria = await Categoria.findOne({name: categorie});
        if(!categoria){
            return res.status(400).json({msg: "Categoria não encontrada!"});
        }

        const productExist = await Produto.findOne({name});
        if(!productExist){
            
            const idProduto = (await Produto.find()).length + 1;

            await Produto.create({
                thumbnail: filename,
                name,
                id_product: idProduto,
                describe, 
                price,
                categorie: categoria._id
            })

            return res.status(200).json({msg: "Produto Cadastrado com sucesso!"});
        } else {
            return res.status(400).json({msg: "Já existe um produto com esse nome cadastrado!"});
        }

    },


    async search(req, res){

        const produtos = await Produto.find();

        return res.status(200).json({allProducts: produtos});
        
    },

    async update(req, res){

        const { id } = req.params;
        const { name, describe, price, categorie } = req.body;

        const categoria = await Categoria.findOne({name: categorie});
        if(!categoria){
            return res.status(400).json({msg: "Categoria não encontrada!"});
        }

        const produto = await Produto.findOne({id_product: id});
        if(!produto){
            return res.status(400).json({msg: "Produto não encontrado!"});
        }


       await Produto.findOneAndUpdate({ id_product: id }, {$set: {
            name,
            describe,
            price,
            categorie: categoria._id
       }}, (err, result) =>{
           if(!err){
                return res.status(200).json({msg: "Produto atualizado com sucesso!"});
           }
       });

    },

    async delete(req, res){

        const { id } = req.params;

        const produto = await Produto.findOne({id_product: id});
        if(!produto){
            return res.status(400).json({msg: "Produto não encontrado!"});
        }

        produto.delete();

        return res.status(200).json({msg: "Produto deletado com sucesso!"});

    }


}