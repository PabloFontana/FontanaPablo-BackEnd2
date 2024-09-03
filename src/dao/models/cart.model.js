const mongoose = require("mongoose");
const moongosePaginate = require("mongoose-paginate-v2")

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//middleware PRE
cartSchema.pre("findOne", function(next){
    this.populate("products")
    next();
})

cartSchema.plugin(moongosePaginate);
const CartModel = mongoose.model("carts", cartSchema);

//model del carrito. Con los productos dentro y la cantidad.

module.exports = CartModel;
