const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller.js");

router.get("/", ProductController.getProducts);
router.get("/:pid", ProductController.getProductById);
router.get("/", ProductController.createProdut);
router.put("/:pid", ProductController.updateProduct);
router.delete("/:pid", ProductController.deleteProduct);




module.exports = router;
