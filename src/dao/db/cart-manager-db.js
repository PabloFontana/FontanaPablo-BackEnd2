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
    //actualizar carrito
    async updateCart(carritoId, productoId, quantity) {
        try {
          const upCart = await CartModel.findOneAndUpdate(
            { _id: carritoId, "products.product": productoId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        ).populate('products.product');

        if (!cart) {
            console.log('Product not found in cart');
            throw new Error('Product not found in cart');
        }

        console.log('Product quantity updated');
        return upCart;
    } catch (error) {
        console.log("Error updating product quantity", error);
        throw error;
    }
    }

      async getAllCarts() {
        try {
// consigo todos los carritos con detalles de productos
            const carts = await CartModel.find().populate('products.product', '_id title price');
            return carts.map(cart => ({
                id: cart._id,
                products: cart.products.map(p => ({
                    id: p.product._id,
                    title: p.product.title,
                    price: p.product.price,
                    quantity: p.quantity
                })),
                totalQuantity: cart.products.reduce((sum, p) => sum + p.quantity, 0) 
                // Calcula la cantidad total de productos
            }));
        } catch (error) {
            console.error('Error retrieving carts:', error);
            throw new Error('Could not retrieve carts');
        }
    }

    async deleteItem(productoId, carritoId) {
        try {
            const cart = await CartModel.findById(carritoId);

            if (!cart) {
                throw new Error('Cart not found');
            }

            const index = cart.products.findIndex(producto => producto.product.toString() === productoId.toString());

            if (index !== -1) {
                cart.products.splice(index, 1);
                await cart.save();
                console.log('Item removed from cart');
            } else {
                console.log('Item not found in cart');
            }
        } catch (error) {
            console.error('Error removing the item:', error);
            throw error;
        }
    }
    async emptyCart(carritoId) {
        try {
            await CartModel.findByIdAndUpdate(
                carritoId,
                { $set: { products: [] } },
                { new: true }
            );
            console.log('Cart emptied successfully');
        } catch (error) {
            console.log("Error emptying the cart", error);
            throw error;
        }
    }

    
    }

module.exports = CartManager;
