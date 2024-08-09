const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json"); 

// ruta de los productos con express-handlebars
router.get("/productos", async (req,res)=>{
    const productos = await manager.getProducts();
    

    res.render("index", { productos });
});


module.exports = router; 