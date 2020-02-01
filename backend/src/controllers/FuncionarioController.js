const Funcionario = require('../models/Funcionario');
const Endereco = require('../models/Endereco');

module.exports = {

    // Registrando novo funcinário no banco de dados se não estiver cadastrado
    async store(req, res){
        
        const { cpf, name, tel, ano_nasc, user_name, password, level } = req.body;
        
        const FuncionarioExist = await Funcionario.findOne({cpf});

        if(FuncionarioExist){
            return res.status(400).json({msg: "Funcionário já cadastrado!"});
        }

        const newFuncionario = await Funcionario.create({
            cpf, 
            name, 
            tel,
            ano_nasc,
            user_name,
            password,
            level
        })
        
        return res.status(200).json({msg: "Funcionário cadastrado no sistema.",data:newFuncionario});
    },

    async update(req, res){

        const { cpfSearch, cpf, name, tel, ano_nasc, user_name, password, level, active } = req.body

        const funcExist = await Funcionario.findOne({cpf:cpfSearch});
        
        if(!funcExist){
           return res.status(400).json({msg: "Não foi possível realizar a alteração!"});
        }

        const searchFunc = await Funcionario.findOneAndUpdate(cpf, {$set:{
            cpf, 
            name, 
            tel,
            ano_nasc,
            user_name,
            password,
            level,
            active
        }}, (err, result)=>{
            if(!err){
                return res.status(200).json({
                    msg: "Funcionário atualizado com sucesso!",
                    data: result
                });
            }
        });



    },

    async search(req, res){

        const { cpf } = req.body;

        const funcExist = await Funcionario.findOne({cpf});
        if(!funcExist){
            return res.status(400).json({msg: "Funcionário não encontrado!"});
        }

        return res.status(200).json({data: funcExist});

    },


    async searchAll(req, res){


        const funcExist = await Funcionario.find();
        if(!funcExist){
            return res.status(400).json({msg: "Não existe funcionários cadastrados!"});
        }

        return res.status(200).json({data: funcExist});

    },


    async delete(req, res){

        const { cpf } = req.body;

        const funcExist = await Funcionario.findOne({cpf});
        
        const enderecoExist = await Endereco.findOneAndDelete({funcionario: funcExist._id}, (err, result)=>{
            if(err){
               return res.status(400).json({msg: "Não foi possível realizar a operação!"});
            }
        });

        if(!funcExist){
            return res.status(400).json({msg: "Funcionário não encontrado!"});
        }

        await Funcionario.findByIdAndDelete(funcExist, (err, result) =>{
            if(!err){
                return res.status(200).json({msg: "Funcionário removido!", data: result});
            }
        })



    }


}