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


module.exports = router; 