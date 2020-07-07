const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class UserController {
    static register(req,res){
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        if(!req.body.name || !req.body.email || !req.body.password){
            res.status(400).json({msg: `name, email, and password required for register`});
        } else {
            User.create(newUser)
                .then(data => {
                    res.status(201).json({name: data.name, msg: `${newUser.name} successfully registered!`})
                })
                .catch(err => {
                    res.status(500).json({msg: err.message});
                })
        }
    }

    static login(req,res){
        const {email, password} = req.body

        if(!email || !password){
            res.status(400).json({msg: `email and password required for login`})
        } else {
            User.findOne({where: {email}})
                .then(foundUser => {
                    if(!foundUser) throw ({status: 404, msg: "Username or Password Invalid"})

                    const checkPassword = comparePassword(password, foundUser.password)

                    if(checkPassword){
                        const token = createToken({id: foundUser.id, email: foundUser.email});
                        res.status(200).json({msg: `${foundUser.name} successfully logined!`, token})
                    } else {
                        throw ({status: 404, msg: "Username or Password Invalid"});
                    }
                })
                .catch(err => {
                    if (err.status) res.status(err.status).json({msg: err.msg});
                    else res.status(500).json({msg: err.message});
                })
        }
    }
}

module.exports = UserController;