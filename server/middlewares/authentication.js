const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

async function Authentication (req, res,  next){
    const { token } = req.headers

    try {
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
      } catch(err) {
            next(err)
      }
}

module.exports = Authentication;