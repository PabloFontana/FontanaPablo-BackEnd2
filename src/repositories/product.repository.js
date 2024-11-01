const ProductDao = require("../dao/product.dao.js")

class ProductRepository{
    async createProduct(productData){
        return await ProductDao.save(productData);
    }
    async getProductById(id){
        return await ProductDao.findById(id);
    }
    async getProducts(query){
        return await ProductDao.find(query);
    }
    async updateProduct(id, productData){
        return await ProductDao.update(id, productData);
    }
    async deleteProduct(id){
        return  ProductDao.delete(id);
    }
}


module.exports = new ProductRepository();
