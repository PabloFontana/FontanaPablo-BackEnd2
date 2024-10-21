const express = require("express");
const UserModel = require ("../dao/models/user.model.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword} = require("../utils/util.js");
const passport = require('passport');
const router = express.Router();
const productRouter = require('./products.router'); 
const UserController = require("../controllers/user.controller.js")

const userController = new UserController();

//registro
router.post("/register", userController.register);
//log
router.post("/login", userController.login );
//cerrar sesion
router.post("/logout", userController.logout)  
//current
router.get("/current", passport.authenticate("current", {session:false}), userController.current)
//admin
router.get("/admin", passport.authenticate("current", {session:false}), userController.admin);

module.exports = router;


