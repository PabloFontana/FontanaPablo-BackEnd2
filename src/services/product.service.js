const ProductRepository = require("../repositories/product.repository.js");

class ProductService{
    async createProduct(productData){
        return await ProductRepository.createProduct(productData);
    }
    async getProductById(query){
        return await ProductRepository.getProductById(id);
    }
    async getProducts(query){
        return await ProductRepository.getProducts(query);
    }
    async updateProduct(id, productData){
        return await ProductRepository.updateProduct(id, productData);
    }
    async deleteProduct(id){
        return ProductRepository.deleteProduct(id);
    }
}

module.exports = new ProductService();