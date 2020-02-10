const Categoria = require('../models/Categoria');


module.exports = {

    // Salva uma nova categoria  
    async store(req, res){

        const { name } = req.body;
        const idCategoriaExist = [];
        var permition = true;

        const totalCategoria = await Categoria.find();
        totalCategoria.forEach((categoria) => {
            idCategoriaExist.push(categoria.id_categorie);

            //Verifica se não existe uma categoria ja cadastrada com esse nome
            if(name.toLowerCase() == categoria.name.toLowerCase()){
                permition = false;
            } 

        });

        // Se existe uma categoria com o mesmo nome
        if(!permition){
            return res.status(400).json({msg: "Já existe uma categoria com esse nome"});
        }

        // Ordenando valores dos id_categoria
        idCategoriaExist.sort();
       
        // Descobrindo uma id válida
        let i = 1;
        while(true){
        
            if(idCategoriaExist.indexOf(i) === -1){
                
                const newCategorie = await Categoria.create({
                    id_categorie: i,
                    name
                });

                if(newCategorie){
                    return res.status(200).json({msg:" Categoria cadastrada com sucesso!"});
                } else {
                    return res.status(400).json({msg: "Erro ao cadastrar nova categoria! Conte o suporte!"});
                }

                break;
            }

            i++;
        }

    },


    // Busca todas as categorias
    async search(req, res){
        
        const allCategorias = await Categoria.find();
        
        return res.status(200).json({data:allCategorias});
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