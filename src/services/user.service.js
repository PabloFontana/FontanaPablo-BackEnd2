const { createHash, isValidPassword } = require("../utils/util.js");
const userRepository = require("../repositories/user.repository.js")


class UserService{
    async registerUser(userData){
        const userExists = await userRepository.getUserByEmail(userdata.email);

        if(userExists) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password) ;
        return await userRepository.createUser(userData); 
}
}
module.exports = new UserService();