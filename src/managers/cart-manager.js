const fs = require("fs").promises;

class CartManager {
    constructor(path){
        this.path = path ;
        this.carts = [];
        this.ultId = 0;
        
        this.cargarCarritos();
    }

    async cargarCarritos(){
        try {
            const data= await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if( this.carts.length > 0 ){
                this.ultId = Math.max(...this.carts.map(cart = cart.id));
                //... para poder traer el array de los carritos, mapeo que solo retorne id
            
            }
        } catch (error) {
            console.log('Error al cargar el carrito');
            await this.guardarCarrito();
        }
    }
    async guardarCarrito(){
        await fs.writeFile(this.path , JSON.stringify(this.carts, null , 2));

    }

    //crear un carrito
    async createCart (){
        const newCart = {
            id: ++this.ultId,
            products: []
        };
        this.carts.push(newCart);

        await this.guardarCarrito();
        return newCart ;
    }

    async getCartById(cartId){
        try {   
            const cartSearch = this.carts.find(cart => cart.id === cartId);
            if( !cartSearch ) {
                console.log("No se encuentra el carrito con ese id");
            }
            return cartSearch;
            
        } catch (error) {
            console.log('Error al buscar el carrito por id, intente de nuevo');
            
        }
    }
}