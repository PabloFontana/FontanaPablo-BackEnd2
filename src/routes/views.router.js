const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/products-manager-db");
const manager = new ProductManager(""); 

// ruta de los productos con express-handlebars
router.get("/products", async (req,res)=>{
    const productos = await manager.getProducts();
    

    res.render("home", { productos });
});
 

//tiempo real para realtimeproducts
router.get("/realTimeProducts", (req, res) =>{
    res.render("realTimeProducts");
});


module.exports = router; 