const mongoose  = require("mongoose");

const ticketSchema= new mongoose.Schema({
    code:{
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime:{
        type:Date,
        defult: Date.new,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});