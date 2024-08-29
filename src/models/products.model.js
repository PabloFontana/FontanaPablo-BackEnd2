const mongoose = require("mongoose");
const fs = require("fs").promises;
// este es el nombre de la collection en la basedatos

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  img: String,
  code: String,
  stock: Number,
});

// el de arriba es el schema de los prodcs. abajo el model

const ProductsModel = mongoose.model(productsCollection, productsSchema);

module.exports = ProductsModel; 