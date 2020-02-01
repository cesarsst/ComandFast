const Mesa = require('../models/Mesa');

module.exports = {

    // Cria um conjunto de mesas com a quantidade fornecida a partir do ultimo id da mesa criada anteriormente 
    async store(req, res){

        const { qtd } = req.body;

        const findTotalMesa = await Mesa.find();
        const totalMesa = findTotalMesa.length;

        var i = totalMesa + 1;
        for(i; i < totalMesa + qtd + 1; i++){
            await Mesa.create({
                id_mesa: i,
            }, (err, result) => {
                if(err){
                    return res.status(400).json({msg: "Erro ao realizar a operação! Contate o suporte."});
                }
            });
        }

        return res.status(200).json({msg: "Mesas criadas com sucesso!"});
    },

    // Busca uma mesas criadas pelo id 
    async search(req, res){

        const {id_mesa} = req.params;

        if(id_mesa == 'all'){
            const totalMesa = await Mesa.find();
            
            if(totalMesa.length == 0){
                return res.status(200).json({msg: "Nenhuma mesa foi criada ainda!"});
            }

            return res.status(200).json({msg: "Quantidade total de mesas: " + totalMesa.length});
        } else {

            const mesa = await Mesa.findOne({id_mesa});
            if(!mesa){
                return res.status(400).json({msg:"Mesa "+ id_mesa +" não foi encontrada"})
            }
            return res.status(200).json({msg: "Mesa encontrada!", data: mesa});

        }
        
    },

    // Adiciona uma nova mesa 
    async addNewMesa(req, res){

        const findTotalMesa = await Mesa.find();
        const totalMesa = findTotalMesa.length;

        const mesa = await Mesa.create({id_mesa: totalMesa + 1});

        return res.status(200).json({msg: "Nova mesa adicionada. Id da mesa: " + mesa.id_mesa});

    },

    // Deleta uma mesa pelo id 
    async delete(req, res){

        const {id_mesa} = req.params; 
        
        const mesa = await Mesa.findOne({id_mesa});
        if(!mesa){
            return res.status(400).json({msg: "Não foi possível completar a ação, mesa inexistente!"});
        }
      
        mesa.delete();
        return res.status(200).json({msg: "Mesa " + id_mesa + " removida com sucesso!"});
     
    } 

}