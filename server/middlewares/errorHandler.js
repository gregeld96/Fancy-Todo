module.exports = function (err, req, res, next) {
    // console.log(err, "=======")
    let statusCode = 500;
    let errArr = [];

    switch (err.name){
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
            errArr.push(err.msg);
            statusCode = err.status;
            break
    }

    res.status(statusCode).json({msg: errArr.toString()})
}
