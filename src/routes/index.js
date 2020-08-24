import express from 'express';
import tokenValidator from '../auth/tokenvalidator';
import authController from '../controllers/authController'
import expenseController from '../controllers/expenseController'

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/resetpassword', authController.resetpassword)


router.use(tokenValidator.validatetoken)

router.post('/expense', expenseController.createExpense)
router.get('/expense', expenseController.readExpenses)
router.put('/expense', expenseController.updateExpense)
router.delete('/expense?expense', expenseController.deleteExpense)

export default router
