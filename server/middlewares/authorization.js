const { Todo } = require('../models');

function Authorization(req,res,next){
    let { id } = req.params
    Todo
        .findByPk(id)
        .then(data => {
            if(!data) throw ({status: 404, msg: "Data Not Found!"})
            else if (data.userId === req.userData.id) next()
            else throw ({status: 403, msg: "You are not Authorized!"})
        })
        .catch(err => {
            let status = err.status || "500"
            let message = err.msg || "Internal Server Error"
            res.status(status).json({msg: message});
        })
}

module.exports = Authorization