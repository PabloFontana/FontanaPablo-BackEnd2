const userService = require("../services/user.service.js");



class UserController {
    async register( req, res){
        const {usuario, password} = req.body;
    //taigo los datos del body
    try {
        const userExists = await UserModel.findOne({ usuario });

        if(userExists){
            return res.status(400).send("Usuario ya existente, intente nuevamente con otro usuario o inice sesion")
        }
        const newUser = new UserModel({
            usuario,
            password: createHash(password)
        });
        await newUser.save();

        const token = jwt.sign({usuario: newUser.usuario}, "coderhouse", {expiresIn: "1h"});


        res.cookie("coderCookieToken", token,{
            maxAge: 3600000,
            httpOnly: true
        });
        res.redirect("/api/sessions/current");
    } catch (error) {
        res.status(500).send("Error interno del servidor: " + error.message);
    }
    }

    async login( req, res ){
        const {usuario, password} = req.body;
    try {
        const usuarioEncontrado = await UserModel.findOne({usuario});

        if(!usuarioEncontrado){
            return res.status(401).send("Usuario incorrecto, intente nuevamente o cree una cuenta");
            
        }
        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Clave incorrecta, intente nuevamente")

        }

        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol:usuarioEncontrado.rol},
            "coderhouse" , {expiresIn: "1h"});

        res.cookie("coderCookieToken", token , {
            maxAge: 3600000,
            httpOnly: true
        })
        res.redirect("/api/sessions/current");
        /* res.send("Registro exitoso"); */
    } catch (error) {
        res.status(500).send("Error interno del servidor");    
    }
    }

    async current( req, res ){
        
    res.render("home", {usuario: req.user.usuario  })
    }

    async logout( req, res ){
        res.clearCookie("coderCookieToken"); 
        res.redirect("/login"); 
    }

    async admin (req , res){
        if(req.user.rol !== "admin") {
            return res.status(403).send("Acceso denegado, solo para admin"); 
        }
    
        res.render("admin");
    }
}

module.exports = UserController ;