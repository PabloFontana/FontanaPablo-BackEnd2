const userService = require("../services/user.service.js");
const UserDTO = require("../dto/user.dto.js");
const jwt = require("jsonwebtoken");


class UserController {
    async register( req, res){
        const {firstName, lastName, email, age, password} = req.body;
    //taigo los datos del body
    try {
        const newUser = await userService.registerUser({ firstName, lastName, email, age, password});
        const token = jwt.sign({
            usuario: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            role: newUser.role
        },"coderhouse", {expiresIn: "2h"});

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
        const {email, password} = req.body;
    try {
        const user = await userService.loginUser(email, password);
        const token = jwt.sign({
            usuario: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role
        },
            "coderhouse" , {expiresIn: "1h"});

        res.cookie("coderCookieToken", token , {
            maxAge: 3600000,
            httpOnly: true
        })
        res.redirect("/api/sessions/current");
        
    } catch (error) {
        res.status(500).send("Error interno del servidor");    
    }
    }

    async current( req, res ){
    if(req.user){
        const user = req.user;
        const userDTO = new UserDTO(user);
        res.render("home", {user: userDTO})
    }else{
        res.send("No autorizado para este campo")
    }
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