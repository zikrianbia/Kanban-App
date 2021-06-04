const jwt = require('jsonwebtoken');

let generateToken = (obj) => {
    const token = jwt.sign(obj, "inisecretgan");
    return token
}

let verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "inisecretgan");
        return decoded
    } catch(err) {
        throw {
            status: 403,
            message: `Please Login First`
        }
    }
}

module.exports = { generateToken, verifyToken }