const Categoria = require('../models/Categoria');


module.exports = {

    // Salva uma nova categoria  
    async store(req, res){

        const { name } = req.body;
        
        const totalCategoria = await Categoria.find();
        const newIdCategoria = totalCategoria.length + 1;
        var permition = true;

        //Verifica se não existe uma categoria ja cadastrada com esse nome
        totalCategoria.forEach((object )=>{
            if(name.toLowerCase() == object.name.toLowerCase()){
                permition = false;
            }  
        })
        
        if(!permition){
            return res.status(400).json({msg: "Já existe uma categoria com esse nome"});
        }
        
        // Se não existir, cria uma nova categoria
        await Categoria.create({
            id_categorie: newIdCategoria,
            name: name
        }, (err, result) =>{
            if(err){
                return res.status(400).json({msg: "Erro ao realizar a operação! Contate o suporte."});
            } else {
                return res.status(200).json({msg: "Categoria adicionada com sucesso!", data: result});
            }
        })

    },

    // Busca todas as categorias
    async search(req, res){
        
        const allCategorias = await Categoria.find();
        
        return res.status(200).json(allCategorias);
    },


    // Realiza update em uma categoria
    async update(req, res){

        const { id } = req.params;
        const { name } = req.body;

        const categoria = await Categoria.findOne({id_categorie: id});

        if(!categoria){
            res.status(400).json({msg:"Categoria não encontrada!"});
        }

        categoria.name = name;
        categoria.save();

        return res.status(200).json({msg: "Categoria atualizada com sucesso!"});
    },

    async delete(req, res){

        const { id } = req.params;

        if(id < 6) {
            return res.status(400).json({msg: "Você não tem permissão para deletar essa categoria!"});
        }

        const categoria = await Categoria.findOne({id_categorie: id});
        if(!categoria){
            return res.status(400).json({msg: "Categoria não encontrada!"});
        }

        categoria.delete();
        return res.status(200).json({msg: "Categoria deletada com sucesso!"});

    }




}