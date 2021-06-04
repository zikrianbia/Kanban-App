const bcrypt = require('bcryptjs');

let hashPassword = (password) => {
    const hashed = bcrypt.hashSync(password, 8)
    return hashed // ? retun hashed password
}

let comparePassword = (password, hashed) => {
    return bcrypt.compareSync(password, hashed); // ? true / false
}

module.exports = { hashPassword, comparePassword }