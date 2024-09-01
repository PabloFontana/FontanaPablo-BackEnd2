const express = require('express');
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js")
const cartManager = new CartManager();

router.post("/" , async (req, res)=>{
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
        } catch (error) {
        res.status(500).send('Error del server');
        
    }
});

router.get("/:cid" , async (req, res) =>{
    const carritoId = req.params.cid;

    try {
        const carritoBuscado = await cartManager.getCartById(carritoId);
        res.json(carritoBuscado.products);
    } catch (error) {
        res.status(500).send("Error del server al buscar el carrito");
    }
})


//agergar productos al carrito
router.post("/:cid/product/:pid" , async (req, res) =>{
    let carritoId =req.params.cid;
    let productoId = req.params.pid;
    let quantity = req.body.quantity || 1 ; 

    try {
        const carritoNew = await cartManager.addProductsCart(carritoId, productoId, quantity);
        res.json(carritoNew.products);
        
    } catch (error) {
        res.status(500).send("Error al ingresar un producto, error del servidor")
    }
})

module.exports = router; 