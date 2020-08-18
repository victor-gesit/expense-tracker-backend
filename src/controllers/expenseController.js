import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

export default {
    createExpense: (req, res) => {
        return res.status(200).send({ message: 'Create Expense'})
    },
    readExpense: (req, res) => {
        return res.status(200).send({ message: 'Read Expense'})
    },
    updateExpense: (req, res) => {
        return res.status(200).send({ message: 'Update Expense'})
    },
    deleteExpense: (req, res) => {
        return res.status(200).send({ message: 'Delete Expense'})
    },

}