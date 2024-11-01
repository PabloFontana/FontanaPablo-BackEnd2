const CartService = require("../services/cart.service.js") ;


class CartController{
async create(req, res){
    try {
        const newCart = await CartService.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send("Error interno del servidor al crear un carrito");
    }
}

async getCart(req, res){
    const { cid } = req.params;
    try {
        const cart = await CartService.getCartById(cid);
        if(!cart) return res.status(404).send("Carrito no encontrado");
        res.json(cart)
    } catch (error) {
        res.status(500).send("Error interno del servidor al encontrar el carrito");
    }
}

async addProductToCart(req, res){
    const { cid, pid } = req.params;
    const {quantity = 1 } = req.params;
    try {
        const cart = await CartService.getCartById(cid)
        if(!cart) return res.status(404).send("Carrito no encontrado");
        
        const existsProduct = cart.products.find( iteam => item.product.toString()=== pid);
        if(!existsProduct){
            existsProduct.quantity += quantity ; 
        }else{
            cart.products.push({product: pid, quantity});
        }
        await CartService.updateCart(cid, cart );
        res.json(cart);
    } catch (error) {
        res.status(500).send("Error interno del servidor al añadir un producto al carrito");
    
    }
}
async updateCart(req,res){
    const {id} = req.params;
    try {
        const updateCart = await CartService.updateCart(id, req.body);
        if(!updateCart)return res.stauts(404).send("Carrito no encontrado")
        res.json(updateCart);
    } catch (error) {
        res.status(500).send("Error interno del servidor al actualizar el carrito");
    }
}
async deleteCart(req,res){
    const {id} = req.params;
    try {
        const deleteCart = await CartService.deleteCart(id);
        if(!deleteCart)return res.stauts(404).send("Carrito no encontrado")
        res.json({message: "Carrito elimnado correctamente"});
    } catch (error) {
        res.status(500).send("Error interno del servidor al eliminar el carrito");
    }
}
//terminar 
async finalizarCompra(req, res) {
    const cartId = req.params.cid
    try {
        const cart = await cartRepository.obtenerProductosDeCarrito(cartId)
        const products = cart.products

        const productosNoDisponibles = []
        for (const item of products){
                const productId = item.product
                const product = await productRepository.obtenerProductoPorId(productId)
                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity
                    await product.save()
                } else {
                    productosNoDisponibles.push(productId)
                }
            }
            const userWithCart = await UserModel.findOne({ cart: cartId });
            const ticket = new TicketModel({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: calcularTotal(cart.products),
                purchaser: userWithCart._id
                });
            await ticket.save();
            cart.products = cart.products.filter(item => productosNoDisponibles.some(productId => productId.equals(item.product)));
            await cart.save();
            
            res.render("checkout", {
                cliente: userWithCar.first_name,
                email: userWithCart.email,
                numTicket: ticket._id 
                        })
            }catch (error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }                    
    }
}

module.exports = new CartController()