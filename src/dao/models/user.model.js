const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
})
//correguir lo de cart 
const UserModel = mongoose.model("usuarios", userSchema);

module.exports = UserModel; 


/* first_name:{

        type: String,
        required: true},
    last_name:{
        type: String,
        required: true},
    email: {
        type: String,
        unique: true},
    age:{
        type: Number,
        required: true},
    password: {
        type: String,
        required: true,
        hash: true },
    cartId: crearCarrito()
    
    {
        type: String,
        required: true}, */