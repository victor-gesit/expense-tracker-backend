import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import models from '../models'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

const User = models.User;
const Expense = models.Expense;


export default {
    createExpense: (req, res) => {
        const { id } = req.decoded
        let purpose = req.body.purpose || '';
        const amount = req.body.amount;
        let category = req.body.category || ''

        const now = new Date()
        const month = now.getMonth() + 1;
        const year = now.getFullYear()

        purpose = purpose.trim()
        category = category.trim()

        User.findOne({
            where: {
                id
            }
        }).then((user) => {
            const userId = user.id
            Expense.create({
                purpose, amount, category, category, userId, month, year
            }).then((expense) => {
                return res.status(200).send({ message: 'Expense Created', expense})
            }).catch((err) => {
                let errors = err.errors || []
                let messages = errors.map((err) => err.message)
                return res.status(400).send({ message: "Could not create expense", success: false, errors: messages})
            })
        }).catch((err) => {
            return res.status(404).send({ 
                message: 'User not found',
                success: false
            })
        })
    },
    readExpenses: (req, res) => {
        const { id } = req.decoded
        Expense.findAll({ where: { userId: id }}).then((expenses) => {
            return res.status(200).send({ message: 'Expenses Read', expenses, success: true })
        }).catch((err) => {
            let errors = err.errors || []
            let messages = errors.map((err) => err.message)
            return res.status(400).send({ message: "Could not create expense", success: false, errors: messages})
        })
    },
    updateExpense: (req, res) => {
        const { expenseId, amount } = req.body
        if(!expenseId) {
            return res.status(404).send({ message: 'Specify an expenseId', success: false })
        }
        Expense.findOne({ where: { id: expenseId }}).then((expense) => {
            if (!expense) {
                return res.status(404).send({ message: 'Expense not found', success: false})
            }
            expense.amount = amount
            expense.save().then((updatedExpense) => {
                console.log("Updated.. ", updatedExpense)
                return res.status(200).send({ message: 'Update Expense', expense, success: true })
            }).catch((err) => {
                console.log("Foun ", expense)
                let errors = err.errors || []
                let messages = errors.map((err) => err.message)
                return res.status(400).send({ message: 'Expense Update Failed', success: false, errors: messages})
            })
        }).catch((err) => {
            console.log("Err. ", err)
            return res.status(400).send({ message: 'Expense Update Failed', success: false})
        })
    },
    deleteExpense: (req, res) => {
        const { expenseId } = req.body
        if(!expenseId) {
            return res.status(404).send({ message: 'Specify an expenseId', success: false })
        }
        Expense.findOne({ where: { id: expenseId }}).then((expense) => {
            if (!expense) {
                return res.status(404).send({ message: 'Expense not found', success: false})
            }
            expense.destroy().then((exp) => {
                return res.status(200).send({ message: 'Expense Deleted', success: true})
            }).catch((err) => {
                return res.status(400).send({ message: 'Expense Delete Failed', success: false})
            })
        }).catch((err) => {
            return res.status(400).send({ message: 'Expense Delete Failed', success: false, err})
        })
    },
}