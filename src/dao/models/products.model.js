const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  thumbnails:{
    type: [String]
  }
});

// el de arriba es el schema de los prodcs. abajo el model

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = ProductsModel; 