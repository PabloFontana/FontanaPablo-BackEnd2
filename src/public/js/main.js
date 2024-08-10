console.log("main.js activo");
//seccion realtimeproducts solo destinanada a admin, no a clientes!!!

const socket= io();

//recibo productos desde app.js
socket.on("productos",(data)=>{

    renderProductos(data);
});

//que el fomrulario solo acepete numeros en price
function validatePriceInput(event) {
    const input = event.target;
    const value = input.value;
    const validValue = value.match(/^\d*\.?\d*$/);

    if (!validValue) {
        alert('Por favor, ingrese un numero');
        input.value = '';
    }
}










const renderProductos=(productos)=>{
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML="";

    productos.forEach(item =>{
        const card = document.createElement("div");
        card.innerHTML=`
        <p>${item.id}</p>
        <p>${item.title}</p>
        <p>$${item.price}</p>
        <button>Eliminar</button>
        `
        contenedorProductos.appendChild(card);

        //vida al boton eliminar
        card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducto(item.id);
            //paso id al backend para eliminar

        })
    })
}

const eliminarProducto=(id)=>{
    socket.emit("eliminarProducto", id);
}

