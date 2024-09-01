//imports
const ProductsModel = require("../models/products.model.js");

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
  }) {
    try {
      if (
        !title ||
        !description ||
        !price ||
        !img ||
        !code ||
        !stock ||
        !category
      ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const existeCode = await ProductsModel.findOne({ code: code });

      if (existeCode) {
        console.log("El codigo ya existe, debe ser unico. Ingrese uno nuevo");
        return;
      }

      //const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
      const nuevoProducto = new ProductsModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        thumbnails,
        status: true,
      });
      await nuevoProducto.save();
    } catch (error) {
      console.log("Erro al agregar un producto nuevo desde 0");
    }
  }

  async getProducts() {
    try {
      const arrayProductos = await ProductsModel.find();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const buscado = await ProductsModel.findById(id);

      if (!buscado) {
        console.log("producto no encontrado");
        return null;
      }
      console.log("Producto encontrado");
      return buscado;
    } catch (error) {
      console.log("Error al buscar por id", error);
    }
  }

  //actualizar productos

  async updateProduct(id, productoActualizado) {
    try {
      const updateando = await ProductsModel.findByIdAndUpdate(
        id,
        productoActualizado
      );
      if (!updateando) {
        console.log("No se encuentra este producto");
        return null;
      }
      return updateando;
    } catch (error) {
      console.log("Tenemos un error al actualizar productos");
    }
  }

  async deleteProduct(id) {
    try {
      const deletes = await ProductsModel.findByIdAndDelete(id);
      if (!deletes) {
        console.log("Este producto no puede ser eliminado porque no existe ");
        return null;
      }
      return deletes;
    } catch (error) {
      console.log("Tenemos un error al eliminar productos");
    }
  }
}

module.exports = ProductManager;
