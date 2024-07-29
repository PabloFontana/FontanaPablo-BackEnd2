const express = require('express');
const router = express.Router();
const CartManager = require("../managers/cart-manager.js")
const cartManager = new CartManager("./src/data/carts.json");

router.post("/" , async (req, res)=>{
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
        } catch (error) {
        res.status(500).send('Error del server');
        
    }
});

router.get("/:cid" , async (req, res) =>{
    const carritoId = parseInt(req.params.cid);

    try {
        const carritoBuscado = await cartManager.getCartById(carritoId);
        res.json(carritoBuscado.products);
    } catch (error) {
        res.status(500).send("Error del server al buscar el carrito");
    }
})


//agergar productos al carrito
router.post("/:cid/product/:pid" , async (req, res) =>{
    const carritoId = parseInt(req.params.cid);
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1 ; 

    try {
        const carritoNew = await cartManager.addProductsCart(carritoId, productoId, quantity);
        res.json(carritoNew.products);
        
    } catch (error) {
        res.status(500).send("Error al ingresar un producto, error del servidor")
    }
})
module.exports = router; 