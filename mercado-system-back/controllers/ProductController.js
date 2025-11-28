import Product from '../models/Product-model.js';

const controller = {
    //post
    createProduct: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            return res.status(201).json({ 
                message: "Produto cadastrado com sucesso!", 
                product: newProduct
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                 return res.status(400).json({ message: "Dados do produto inválidos.", detail: error.message });
            }
            return res.status(500).json({ message: "Erro ao cadastrar produto.", detail: error.message });
        }
    },
    //get All
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 }); 
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar produtos.", detail: error.message });
        }
    },
    //get Id
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar produto.", detail: error.message });
        }
    },
    //put Id
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true } 
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            return res.status(200).json({ 
                message: "Produto atualizado com sucesso!", 
                product: updatedProduct 
            });

        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar produto.", detail: error.message });
        }
    },
    //delete Id
    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            return res.status(200).json({ message: "Produto removido com sucesso." });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover produto.", detail: error.message });
        }
    },
    //aplicar promoção
    applyPromotion: async (req, res) => {
        const productId = req.params.id;
        const { promotionPrice } = req.body;

        if (typeof promotionPrice !== 'number' || promotionPrice <= 0) {
            return res.status(400).json({ message: "O preço de promoção deve ser um número positivo válido." });
        }
        
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            if (promotionPrice >= product.currentPrice) {
                 return res.status(400).json({ message: "O preço de promoção deve ser menor que o preço atual." });
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { promotionPrice: promotionPrice },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ 
                message: "Promoção aplicada com sucesso!", 
                product: updatedProduct 
            });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao aplicar promoção.", detail: error.message });
        }
    },
    //remover promoção
    removePromotion: async (req, res) => {
        const productId = req.params.id;

        try {
            //define o preço de promoção
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { promotionPrice: null }, 
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            return res.status(200).json({ 
                message: "Promoção removida com sucesso. Preço atual restaurado.", 
                product: updatedProduct 
            });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover promoção.", detail: error.message });
        }
    },
};

export default controller;