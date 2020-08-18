import express from 'express';
import tokenValidator from '../auth/tokenvalidator';
import authController from '../controllers/authController'
import expenseController from '../controllers/expenseController'

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/resetpassword', authController.resetpassword)


router.use(tokenValidator.validatetoken)

router.post('/create-expense', expenseController.createExpense)
router.get('/read-expenses', expenseController.readExpense)
router.post('/update-expense', expenseController.updateExpense)
router.delete('/delete-expense', expenseController.deleteExpense)

export default router