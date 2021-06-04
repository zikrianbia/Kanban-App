const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("317025457916-29gjl914gftv40fi6u15t1dbbr2f6u7e.apps.googleusercontent.com");

class UserController {
    static async register(req,res,next) {
        try {
            const {username, email, password} = req.body
            const user = await User.create({
                username,
                email,
                password
            })
            res.status(201).json({
                username: user.username,
                id: user.id,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }

    
    static async login(req,res,next) {
        try {
            const {email,password} = req.body;
            const user = await User.findOne({where: {email: email}})
            
            if (!user) {
                throw {
                    name: 'UserNotFound'
                }
            } else if (!comparePassword(password, user.password) || email !== user.email) {
                throw {
                    name: 'WrongEmail/Password'
                }
            } else {
                const access_token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token:access_token})
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: "317025457916-29gjl914gftv40fi6u15t1dbbr2f6u7e.apps.googleusercontent.com"
            });

            const payload = ticket.getPayload()
            const userlogin = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (userlogin) {
                const access_token = generateToken({id:userlogin.id, email:userlogin.email})
                res.status(200).json({access_token, email: payload.email})
            } else {
                const createuser = await User.create({
                    email: payload.email,
                    password: "googlePassword"
                })
                const access_token = generateToken({id:createuser.id, email:createuser.email})
                res.status(200).json({access_token, email: payload.email})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController