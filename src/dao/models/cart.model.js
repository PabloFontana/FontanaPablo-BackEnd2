const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: String,
                require: true
            },
            quantity:{
                type:Number,
                required: true
            }

        }
    ]
});

const CartModel = mongoose.model("carts", cartSchema);

//model del carrito. Con los productos dentro y la cantidad.

module.exports = CartModel;