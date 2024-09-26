const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const moongosePaginate = require("mongoose-paginate-v2")

const userSchema = new mongoose.Schema({
    first_name:{
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
    cart:{
        type: String,
        required: true},
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
})
//correguir lo de cart 
const UserModel = mongoose.model("users", userSchema);


