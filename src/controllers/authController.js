import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

export default {
    signin: (req, res) => {
        return res.status(200).send({ message: 'Sign in'})
    },
    signup: (req, res) => {
        return res.status(200).send({ message: 'Sign in'})
    },
    resetpassword: (req, res) => {
        return res.status(200).send({ message: 'password reset'})
    }
}