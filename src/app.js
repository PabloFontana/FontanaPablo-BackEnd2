/* import express from "express"; */
const exphbs = require("express-handlebars");

const express = require("express"); 

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const app = express(); 
const PUERTO = 8080;


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

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);



const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

//traigo metemodos de productmanager
const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");


const io = socket(httpServer);

io.on("connection",async ( socket )=>{
    console.log("Nuevo cliente activo");
    socket.emit("productos", await manager.getProducts());


    //elminar producto
socket.on("eliminarProducto", async (id)=>{
await manager.deleteProduct(id);
//actualizacion de prod
    io.socket.emit("productos", await manager.getProducts());
});
})




