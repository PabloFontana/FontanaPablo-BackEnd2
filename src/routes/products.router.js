const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/products-manager-db.js");
const manager = new ProductManager();

//lista de prod
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;
    const products = await manager.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
  });
  res.json({
    status: 'success',
    payload: products.docs,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
});

  } catch (error) {
    console.error("Error getting products", error);
        res.status(500).json({
            status: 'error',
            error: "Internal server error"
  })
}

});






//Busqueda de producto por ID

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    const producto = await manager.getProductById(id);

    if (!producto) {
      res.send("Producto no encontrado");
    } else {
      res.send(producto);
    }
  } catch (error) {
    res.send("Error al buscar ese id en los productos");
  }
});

//Agregar nuevo producto:

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manager.addProduct(nuevoProducto);
    res.status(201).json({
        message: "Producto agregado correctamente"
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//actualizo pid
router.put("/:pid", async (req, res) => {
  const productoActualizado = req.body;
  const id = req.params.pid;

  try {
    await manager.updateProduct(id, productoActualizado);
    res.json({
        message: "Producto actualizado correctamente, la vida nos sonrie"
    });
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

//eliminar user desde postman
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await manager.deleteProduct(id);
    res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
