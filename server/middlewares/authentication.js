const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

async function Authentication (req, res,  next){
    const { token } = req.headers

    try {
        if(!token) throw ({msg: "You don't have token", status: 400})
        else {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })

            if(!user) throw ({msg: "Authetication Failed!", status: 401})
            else {
                req.userData = decoded;
                next()
            }
        }
      } 
    catch(err) {
        let status = err.status || "500";
        let message = err.msg || "Internal Server Error"
        res.status(status).json({msg: message});
      }
}

module.exports = Authentication;