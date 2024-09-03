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

  /* async getProducts() {
    try {
      const arrayProductos = await ProductsModel.find().lean();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
      throw error; 
    }
  } */

  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;

      // Opciones de consulta para filtro por categoría o estado
      let queryOptions = {};
      if (query) {
        queryOptions = {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { status: query.toLowerCase() === "available" ? true : false },
          ],
        };
      }

      // Opciones de ordenamiento
      const sortOptions = {};
      if (sort) {
        if (sort === "asc" || sort === "desc") {
          sortOptions.price = sort === "asc" ? 1 : -1;
        }
      }

      // Consulta a la base de datos
      const products = await ProductsModel.find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      // Contar productos totales
      const totalProducts = await ProductsModel.countDocuments(queryOptions);

      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;

      return {
        docs: products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&query=${query}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      console.log("Error getting products", error);
      throw error;
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
