import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import models from '../models'
import emailTemplate from './utils/emailTemplate'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

const User = models.User;

export default {
    signin: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).send({ message: 'Email or password missing', success: false})
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
            return res.status(401).send({ message: 'Sign in failed' , success: false, errors: messages})
        })
    },
    signup: (req, res) => {
        let email = req.body.email || ''
        let password = req.body.password || ''
        let name = req.body.name || ''

        if(!email  || !password || !name) {
            return res.status(400).send({ message: 'Provide `email`, `password` and `name`', success: false})
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
            return res.status(400).send({ message: 'Sign up failed' , success: false, errors: messages})
        })
    },
    recoverAccount: async (req, res) => {
        const { email } = req.body
        if (!email) {
            return res.status(400).send({ message: 'Provide recovery email', success: false })
        }
        User.findOne({ where: { email }})
            .then((user) => {
                if(!user) {
                    return res.status(400).send({ message: 'Password reset failed. User does not exist', success: false})
                }

                const name = user.name
                const token = jwt.sign({ id: user.id}, jwtSecret, { 
                    expiresIn: 600 // 10 minutes
                })

                const htmlTemplate =  emailTemplate.html(name, token)
                const options = {
                    from: '"eTracker" theexpensetrackerapp@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    html: htmlTemplate
                };

                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                transporter.sendMail(options).then(() => {
                    return res.status(200).send({ message: 'Recovery mail sent successfully', success: true})
                }).catch((error) => {
                    return res.status(500).send({ message: 'Could not send recovery mail', success: false })
                })
            }).catch((error) => {
                    return res.status(400).send({ message: 'Password reset failed', success: false})
            })
    },
    resetPassword: (req, res) => {
        const { id } = req.decoded
        const password = req.body.newPassword

        User.findOne({ where: { id }}).then((user) => {
            if (!user) {
                return res.status(400).send({ message: 'Password recovery failed', success: false })
            }
            user.password = password
            user.save().then(() => {
                return res.status(200).send({ message: 'Password reset successfully', success: true })
            }).catch((err) => {
                let errors = err.errors || []
                let messages = errors.map((err) => err.message)
                return res.status(400).send({ message: 'Password recovery failed' , success: false, errors: messages})
            })
        }).catch((err) => {
            return res.status(400).send({ message: 'Password reset failed', success: false })
        })
    }
}