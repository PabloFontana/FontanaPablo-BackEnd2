const router = express.Router();
const UserModel = require ("../dao/models/user.model");
//registro
router.post("/register", async (req, res) => {
    const {usuario, password} = req.body;
//taigo los datos del body
    try {
        const userExists = await UserModel.findOne({ usuario});

        if(userExists){
            return res.status(400).send("Usuario ya existente, intente nuevamente con otro usuario o inice sesion")
        }
    } catch (error) {
        
    }
})

//log


//admin

module.exports = router;
