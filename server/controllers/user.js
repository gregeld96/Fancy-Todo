const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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

    static googleLogin(req, res, next) {
        let name = null;
        let email = null;

        const { id_token } = req.body
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID);
        
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            name = ticket.getPayload().name;
            email = ticket.getPayload().email;
            
            return User.findOne({where: {email}})
        })
        .then(foundUser => {
            if(foundUser){
                //login
                return foundUser
            } else {
                const password = Math.random()*1000 + 'goole login password';
                return User.create({name, email, password})
            }
        })
        .then(user => {
            const token = createToken({id: user.id, email: user.email});
            res.status(200).json({token})
        })
        .catch(err => {
            next(err)
        })
            

    }
}

module.exports = UserController;