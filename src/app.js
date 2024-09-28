/* import express from "express"; */
const exphbs = require("express-handlebars");
const express = require("express"); 
const mongoose = require("mongoose");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require ("./config/passport.config.js")
const userRouter = require("./routes/user.router.js");
const { engine } = require("express-handlebars");


const app = express(); 
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");

require("./database.js"); 


//socket
const socket = require("socket.io");

//handlebars
app.engine("handlebars" , exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//middleware
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.static("./src/public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());



//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("products", productRouter);
app.use("/api/sessions", userRouter);
app.use("/", viewsRouter);


app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

