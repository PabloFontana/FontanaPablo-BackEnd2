const mongoose = require("mongoose"); 

//conexion con mongodb atlas
 mongoose.connect("mongodb+srv://pablofontanaCH:coderhouse@cluster0.qyda2.mongodb.net/MiProyecto-BackEnd?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("Nos conectamos bien a la base de datos"))
.catch(()=> console.log("Pusiste expectativa muy altas, FALLO data base"))  