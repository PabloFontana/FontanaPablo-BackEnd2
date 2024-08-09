/* import express from "express"; */
const exphbs = require("express-handlebars");

const express = require("express"); 

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const app = express(); 
const PUERTO = 8080;

//handlebars

app.engine("handlebars" , exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



//middleware
app.use(express.json());
app.use(express.static("./src/public"));

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);



app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})




