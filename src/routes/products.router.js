const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js"); 
const manager = new ProductManager("./src/data/productos.json");


//model de prodcuts con mongoose

const ProductsModel = require("../models/products.model.js");


/* router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}) */


router.get("/", async (req, res)=> {
    try {
        const arrayProducts = await ProductsModel.find()
        res.json(arrayProducts);
    } catch (error) {
        res.status(500).json({message: "No era tan facil"});
    }
    

});


//Busqueda de producto por ID

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})


//Agregar nuevo producto: 

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    
    try {
        const product = new ProductsModel(nuevoProducto);
        await product.save();

        res.send({message: "Producto agregado existosamente", producto: product}) 
        
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
})

router.put("/:id", async (req,res)=>{
    try {
        const product = await ProductsModel.findByIdAndUpdate(req.params.id, req.body);
        if(!product){
            return res.status(404).send("El producto no fue encontrado")
        }
        res.status(201).send({message: "Producto actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error del servidor");
        
    }
})

//eliminar user desde postman
router.delete("/:id", async (req,res)=>{

    try {
        const producto = await ProductsModel.findByIdAndDelete(req.params.id)
        if(!producto){
            return res.status(404).send("El producto no fue encontrado")
        }
        res.send("Producto eliminado!")
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


module.exports = router; 

