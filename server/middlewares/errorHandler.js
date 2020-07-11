module.exports = function (err, req, res, next) {
    // console.log(err, "=======")
    let statusCode = 500;
    let errArr = [];

    switch (err.name){
        case "SequelizeUniqueConstraintError":
        case 'SequelizeValidationError':
            statusCode = 400;
            err.errors.forEach(errData => {
                errArr.push(errData.message)
            })
            break;
        case 'JsonWebTokenError':
            statusCode = 400;
            errArr.push('token invalid!');
            break;
        default:
            let message = err.msg || 'internal server error'
            errArr.push(message);
            statusCode = err.status || statusCode
            break;
    }

    res.status(statusCode).json({msg: errArr.toString()})
}
