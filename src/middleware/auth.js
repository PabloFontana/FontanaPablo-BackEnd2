export function onlyAdmin(req,res , next){
    if(req.user === "admin"){
        next();
    }else{
        res.status(403).send("Acceso denegado, ingreso solo permitidos a usuarios")
    }
}

export function onlyUser(req,res , next){
    if(req.user === "user"){
        next();
    }else{
        res.status(403).send("Acceso denegado, ingreso solo permitidos a administradores")
    }
}