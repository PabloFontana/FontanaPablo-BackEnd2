const ProductService = require("../services/product.service.js");

class ProductController{
    async getProducts(req, res){
        const {limit = 10, page = 1, sort, query} = req.query;
        try{
            
        const products = await productService.getProducts({limit, page, sort, query})
        res.json(products);
        }catch(error){
            res.status(500).send("Error interno del servidor", error )
        }
    }
    async getProductById(req, res){
        const {id} = req.params;
        try {
            const product = await productService.getProductById(id);
            if (!product) return res.status(404).send("Producto no encontrado, intente con otro");
            res.json(product);
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }
    async createProdut(req,res){
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).send("Error interno del servidor")
        }
    }
    async updateProduct(req,res){
        const {id} = req.params;
        try {
            const updateProduct = await ProductService.updateProduct(id, req.body);
            if(!updateProduct)return res.stauts(404).send("Producto no encontrado")
            res.json(updateProduct);
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }
    async deleteProduct(req,res){
        const {id} = req.params;
        try {
            const deleteProduct = await ProductService.deleteProduct(id);
            if(!deleteProduct)return res.stauts(404).send("Producto no encontrado")
            res.json({message: "Producto elimnado correctamente"});
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }
}

module.exports = new ProductController();