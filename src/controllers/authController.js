import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import models from '../models'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

const User = models.User;

export default {
    signin: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).send({ message: "Email or password missing", success: false})
        }
        User.findOne({
            where: {
                email
            }
        }).then((user) => {
            if(!user) {
                return res.status(401).send({
                    message: 'Email or password incorrect',
                    success: false
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword) {
                return res.status(401).send({
                    message: 'Email or password incorrect',
                    success: false
                })
            }
            
            const token = jwt.sign({ id: user.id}, jwtSecret)
            return res.status(200).send({
                message: 'Signed in successfully',
                success: true,
                token,
                user: { name: user.name, email: user.email, id: user.id, createdAt: user.createdAt}
            })
        }).catch((err) => {
            let errors = err.errors || []
            let messages = errors.map((err) => err.message)
            return res.status(401).send({ message: "Sign in failed" , success: false, errors: messages})
        })
    },
    signup: (req, res) => {
        let email = req.body.email || ''
        let password = req.body.password || ''
        let name = req.body.name || ''

        if(!email  || !password || !name) {
            return res.status(400).send({ message: "Provide `email`, `password` and `name`", success: false})
        }

        email = email.trim()
        password = password.trim()
        name = name.trim()

        let newUser = User.build({
            name, email, password
        })
        
        newUser.save().then((user) => {
            const token = jwt.sign({ id: user.id}, jwtSecret)
            return res.status(201).send({
                message: 'User  created successfully',
                success: true,
                token,
                user: { name: user.name, email: user.email, id: user.id, createdAt: user.createdAt}
            })
        }).catch((err) => {
            let errors = err.errors || []
            let messages = errors.map((err) => err.message)
            return res.status(400).send({ message: "Sign up failed" , success: false, errors: messages})
        })
    },
    resetpassword: (req, res) => {
        return res.status(200).send({ message: 'password reset not implemented yet'})
    }
}