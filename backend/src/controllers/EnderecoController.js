const Endereco = require('../models/Endereco');
const Funcionario = require('../models/Funcionario');

module.exports = {


    async store(req, res){

        const { cpf, num, rua, bairro, cidade, estado } = req.body;


         // Busca se existe funcionario correspondente ao cpf
         const funcSearch = await Funcionario.findOne({cpf});
         if(!funcSearch){
             return res.status(400).json({msg: "CPF não encontrado!"});
         }

        // Busca se existe um endereço já cadastrado no CPF fornecido.
        const enderecoExist = await Endereco.findOne({funcionario: funcSearch._id});
        if(enderecoExist){
            return res.status(400).json({msg: "O funcionário já possui um endereço cadastrado!"});
        }

        // Cria o endereço com a referência ao funcionário fornecido pelo CPF
        await Endereco.create({
            funcionario: funcSearch._id,
            num,
            rua,
            bairro,
            cidade,
            estado
        }, (err, result) => {
            if(!err){
                return res.status(200).json({
                    msg: "Endereço cadastrado com sucesso!",
                    data: result
                });
            }
        })

    },

  
    async update(req, res){

        const { cpf } = req.params;
        const { num, rua, bairro, cidade, estado } = req.body; 

        // Busca se existe funcionario correspondente ao cpf
        const funcExist = await Funcionario.findOne({cpf});
        if(!funcExist){
            return res.status(400).json({msg: "Funcionário não encontrado!"});
        }
    
        // Busca se existe um endereço cadastrado em nome do funcionário buscado
       const enderecoExist = await Endereco.findOne({funcionario: funcExist._id});
       if(!enderecoExist){
           return res.status(400).json({msg: "O funcionario '" + funcExist.name + "' não possui endereço cadastrado!"});
       }
       
       // Realiza a alteração dos dados
       await Endereco.updateOne({funcionario: funcExist._id}, {$set: {
            num,
            rua,
            bairro,
            cidade,
            estado
        }}, (err, result) => {
            if(err) return res.status(400).json({msg: "Erro ao atualizar o endereço!"});

            res.status(200).json({msg: "Endereço atualizado com sucesso!"});
        }); 

    },


    async searchEndereco(req, res){
        
        const { cpf } = req.body;

        // Busca se existe funcionario correspondente ao cpf
        const funcExist = await Funcionario.findOne({cpf});
        if(!funcExist){
            return res.status(400).json({msg: "Funcionário não encontrado!"});
        }

        // Busca se existe um endereço cadastrado em nome do funcionário buscado
       const enderecoExist = await Endereco.findOne({funcionario: funcExist._id});
       if(!enderecoExist){
           return res.status(400).json({msg: "O funcionario '" + funcExist.name + "' não possui endereço cadastrado!"});
       }

       return res.status(200).json({data: enderecoExist});

    }
    
}