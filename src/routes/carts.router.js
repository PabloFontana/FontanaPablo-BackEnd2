const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");

router.post("/", CartController.create);
router.get("/:cid", CartController.getCart);
router.post("/:cid/product/:pid", CartController.addProductToCart);
router.put("/:cid", CartController.updateCart); 
router.delete("/:cid", CartController.deleteCart);
router.post("/:cid/purchaser", CartController.finalizarCompra);

module.exports = router; 
