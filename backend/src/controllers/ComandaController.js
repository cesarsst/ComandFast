const Comanda = require('../models/Comanda');

module.exports = {


    async search(req, res){

        const { id_mesa } = req.body;

        const comanda = await Comanda.findOne({mesa:id_mesa, status:true})

        if(!comanda){
            return res.status(400).json({msg: "Comanda não encontrada!"});
        }

        return res.status(200).json({data: comanda});
        


    },

   
    
    async store(id_mesa){

        const idComandExist = [];

        const totalComanda = await Comanda.find()
        totalComanda.forEach((comanda) => {
            idComandExist.push(comanda.id_comanda);
        });

        idComandExist.sort();

        // Descobrindo uma id válida
        let idDisponivel = 1;
        while(true){
        
            if(idComandExist.indexOf(idDisponivel) === -1){
                                                
                                        
                    await Comanda.create({
                        id_comanda: idDisponivel,
                        mesa: id_mesa
                    })
            
                    break;           
            }

            idDisponivel++;             
        }


    }



}


