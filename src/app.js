const express = require("express"); 

const productRouter = require("./routes/products.router.js");
//const cartRouter = require("./routes/carts.router.js");
const app = express(); 
const PUERTO = 8080;

//middleware
app.use(express.json());

//routes
app.use("/api/products", productRouter);

app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})




