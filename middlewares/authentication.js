const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    const access_token = req.headers.access_token
    try {
        if (!access_token) {
            throw {
                status: 401,
                message: `Please Login First`
            }
        } else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (user) {
                req.loggedIn = decoded
                next()
            } else {
                throw {
                    status: 401,
                    message: `Please Login First`
                }
            }
        }
    } catch (error) {
        next(error)
    }
}