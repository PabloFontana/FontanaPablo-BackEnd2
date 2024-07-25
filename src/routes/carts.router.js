const express = require('express');
const router = express.Router();
const CartManager = require("../managers/cart-manager.js")
const cartManager = new CartManager("./src/data/carts.json");

router.post("/" , async (req, res)=>{
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
        } catch (error) {
        res.status(500).send('Error del server');
        
    }
});







module.exports = router; 