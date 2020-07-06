const bcrypt = require('bcryptjs');

function hashPassword(inputPassword){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(inputPassword, salt);
}

function comparePassword(inputPassword, hashPassword){
    return bcrypt.compareSync(inputPassword, hashPassword); 
}

module.exports = {hashPassword, comparePassword};