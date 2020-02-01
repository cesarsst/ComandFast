const Pedido = require('../models/Pedido');
const Produto = require('../models/Produto');
const Mesa = require('../models/Mesa');

module.exports = {

    async store(req, res) {

        const { products, mesa } = req.body;
        const date = new Date;
        const productList = [];

        products.forEach(async function (element){
            var product = await Produto.findOne({id_product: element})
            if(!product){
                return res.status(400).json({msg: "Número de produto não indentificado!"});
            }
            productList.push(product._id);
        });

        const numMesa = await Mesa.findOne({id_mesa: mesa});
        if(!numMesa){
            return res.status(400).json({msg:"Número de mesa não encontrado!"});
        }

        const pedido = await Pedido.create({
            date,
            products: productList,
            mesa: numMesa._id,
            id_pedido: 1
        })
    
        await pedido.populate('products').populate('mesa').execPopulate();

        return res.status(200).json({msg: "Pedido efetuado com sucesso!", pedido});

    },

    async search(req, res){

        const { id } = req.params;

        // Se id = 0 recupera todos os pedidos, se não filtra pelo id solicitado
        if(id == 0){
            const allPedidos = await Pedido.find();
            return res.status(200).json({pedidos: allPedidos});
        } else {
            const pedido = await Pedido.findOne({id_pedido: id});
            if(!pedido){
                return res.status(400).json({msg:"Pedido não encontrado!"});
            }
            return res.status(200).json({pedido});

        }

    },





}