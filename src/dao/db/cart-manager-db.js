//imports
const CartModel = require("../models/cart.model.js");


class CartManager {
    //crear un carrito
    async crearCarrito (){
     try {
        const newCart = new CartModel({ products: []});
        await newCart.save();
        return newCart;
     } catch (error) {
        console.log(" Error al generar el carrito nuevo")
     }   
    }

    async getCartById(carritoId){
        try {   
            const carrito = await CartModel.findById(carritoId);
            if( !carrito ) {
                console.log("No se encuentra el carrito con ese id");
            }
            return carrito;
            
        } catch (error) {
            console.log('Error al buscar el carrito por id, intente de nuevo');
            
        }
    }

    async addProductsCart(carritoId, productoId, quantity = 1 ){
        try {
            const carrito  = await this.getCartById(carritoId);
            const existeProducto  = carrito.products.find( p => p.product.toSting() === productoId);
            //verifico si el produco deseado ya existe dentro del carrito
    
            if(existeProducto ){
                existeProducto.quantity += quantity;
            }else{
                carrito.products.push({product: productoId, quantity});
    
            }
            carrito.markModified("products");
            await carrito.save();

            return carrito;
        } catch (error) {
            console.log("Error al agregar un producto al carrito");
        }
    }
}

module.exports = CartManager;
