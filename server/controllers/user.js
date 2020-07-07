const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class UserController {
    static register(req,res,next){
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(data => {
                res.status(201).json({name: data.name, msg: `${newUser.name} successfully registered!`})
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req,res,next){
        const {email, password} = req.body

        if(!email || !password){
            next({
                status: 400,
                msg: `email and password required for login`
            })
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
                    next(err)
                })
        }
    }
}

module.exports = UserController;