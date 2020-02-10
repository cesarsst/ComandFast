const Mesa = require('../models/Mesa');
const Pedido = require('../models/Pedido');
const Comanda = require('../models/Comanda');

const ComandaController = require('../controllers/ComandaController');

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

            return res.status(200).json({msg: "Quantidade total de mesas: " + totalMesa.length, data: totalMesa});
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
     
    },

    async update(req, res){

        const { id_mesa, status } = req.body;

        const mesa = await Mesa.findOne({id_mesa});
        if(!mesa){
            return res.status(400).json({msg: "Não foi possível completar a ação, mesa inexistente!"});
        }
    
    // Abrindo uma Mesa e sua comanda
        if(status == "true"){
        
            const comandaExist = await Comanda.find({mesa: id_mesa, status: true});
            if(comandaExist.length > 0){
                return res.status(400).json({msg: "Erro ao executar operação! Já existe uma comanda para essa mesa!"});
            }

            await ComandaController.store(id_mesa);

            mesa.status = true;
            mesa.save();

            return res.status(200).json({msg: "Mesa aberta com sucesso!"});
        } 
    
    // Fechando a mesa
        if(status == "false") {

            // Se existir pedidos sendo processados, não permite fechamento da comanda
            const pedidoOpenExist = await Pedido.find({mesa: mesa._id, status: true});
            if(pedidoOpenExist.length > 0){
                return res.status(400).json({msg: "Existem pedidos em aberto nessa mesa! Feche a comanda para executar essa ação"});
            }

            // Se pedidos estão encerrados, fecha a comanda da mesa
            const comandaExist = await Comanda.findOne({mesa: id_mesa, status: true});
            if(comandaExist){
                comandaExist.status = false;
                comandaExist.save();
            } else {
                return res.status(400).json({msg:"Erro fatal. Contate a equipe DevData! Error: 0001"})
            }
            
            mesa.status = false;
            mesa.save();
            return res.status(200).json({msg: "Mesa fechada com sucesso!"});
           

        }
        

    }

}