const { createHash, isValidPassword } = require("../utils/util.js");
const userRepository = require("../repositories/user.repository.js")


class UserService{
    async registerUser(userData){
        const userExists = await userRepository.getUserByEmail(userData.email);

        if(userExists) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password) ;
        return await userRepository.createUser(userData); 
}
async loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if(!user || !isValidPassword(password, user)) throw new Error("Credenciales incorectas, intente nuevamente")
    return user;
    
}

}
module.exports = new UserService();