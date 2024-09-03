const express = require('express');
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js")
const cartManager = new CartManager();



router.post("/" , async (req, res)=>{
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
        } catch (error) {
        res.status(500).send('Error del server');;
        
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

// Vaciar un carrito
router.delete("/:cid", async (req, res) => {
    const carritoId = req.params.cid;

    try {
        await cartManager.emptyCart(carritoId);
        res.json({ message: "Cart emptied successfully" });
    } catch (error) {
        console.error(`Error trying to empty cart with ID: ${carritoId}`, error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Eliminar un producto específico de un carrito
router.delete("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;

    try {
        await cartManager.deleteItem(productoId, carritoId);
        res.json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error deleting product from cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});






// Actualizar la cantidad de un producto en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
    }

    try {
        const updatedCart = await cartManager.updateCart(carritoId, productoId, quantity);
        res.json(updatedCart.products);
    } catch (error) {
        console.error("Error updating product quantity in cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Actualizar el carrito con un array de productos
router.put("/:cid", async (req, res) => {
    const carritoId = req.params.cid;
    const newProducts = req.body.products;

    try {
        const cart = await cartManager.getCartById(carritoId);

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.products = newProducts;
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error("Error updating the cart", error);
        res.status(500).json({ error: "Error updating the cart" });
    }
});


module.exports = router; 