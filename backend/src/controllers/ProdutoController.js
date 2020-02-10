const fs = require('fs');

const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');

module.exports = {


    async store(req, res){

        const { filename } = req.file;
        const { name, describe, price, categorie } = req.body;

        const idProductExist = [];

        const totalProducts = await Produto.find();
        totalProducts.forEach((produto) => {
            idProductExist.push(produto.id_product);
        });

        idProductExist.sort();

           // Descobrindo uma id válida
           let idDisponivel = 1;
           while(true){
           
               if(idProductExist.indexOf(idDisponivel) === -1){
                   
                    const categoria = await Categoria.findOne({name: categorie});
                    if(!categoria){
                        return res.status(400).json({msg: "Categoria não encontrada!"});
                    }
            
                    const productExist = await Produto.findOne({name});
                    if(!productExist){
                            
                        await Produto.create({
                            thumbnail: filename,
                            name,
                            id_product: idDisponivel,
                            describe, 
                            price,
                            categorie: categoria.name
                        })
            
                        return res.status(200).json({msg: "Produto Cadastrado com sucesso!"});
                    } else {
                        return res.status(400).json({msg: "Já existe um produto com esse nome cadastrado!"});
                    }

                    break;           
            }

            idDisponivel++;             
        }
        

    },


    async search(req, res){

        const { id } = req.params;

        let produtos = [];

        if(id === 'all'){
             produtos = await Produto.find();
        } else {
            produtos = await Produto.findOne({id_product: id});
        }
       


        return res.status(200).json({data: produtos});
        
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

        var filename = produto.thumbnail;
        if(req.file){
            filename = req.file.filename; 
        }

        produto.thumbnail= filename;
        produto.name = name;
        produto.describe = describe;
        produto.price = price;
        produto.categorie = categorie;
        produto.save();

        return res.status(200).json({msg: "Produto atualizado com sucesso!"});
    },

    async delete(req, res){

        const { id } = req.params;

        const produto = await Produto.findOne({id_product: id});
        if(!produto){
            return res.status(400).json({msg: "Produto não encontrado!"});
        }

        if(produto.thumbnail != ""){
            await fs.unlinkSync('uploads/'+ produto.thumbnail);
        }
 

        produto.delete();

        return res.status(200).json({msg: "Produto deletado com sucesso!"});

    }


}