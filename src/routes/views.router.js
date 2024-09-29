const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/products-manager-db");
const ProductsModel = require("../dao/models/products.model");
const manager = new ProductManager(""); 

// ruta de los productos con express-handlebars
router.get("/products", async (req,res)=>{
    
   /*  try {
        const productos = await manager.getProducts();
        res.render("home", {productos});
    } catch (error) {
        res.status(500).send('Error en el servidor');
    } */
   try { 
    const { page = 1, limit = 5, sort = 'asc', query = '' } = req.query;
    const validSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
    
    const productos = await manager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
        query,
        sort: validSort,
    });

    const productsResultadoFinal = productos.docs.map((products) =>{
        const rest = products.toObject();
        return rest;
                })
                
        res.render("products",{
            productos: productsResultadoFinal,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
        })
   } catch (error) {
    
    res.status(500).send("Error al cargar productos desde get")
    throw error;
   }
});
 

//tiempo real para realtimeproducts
router.get("/realTimeProducts", (req, res) =>{
    res.render("realTimeProducts");
});


router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/admin", (req,res) =>{
    res.render("admin");
})

module.exports = router; 