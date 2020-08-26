import express from 'express';
import tokenValidator from '../auth/tokenvalidator';
import authController from '../controllers/authController'
import expenseController from '../controllers/expenseController'

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/recoveraccount', authController.recoverAccount)


router.use(tokenValidator.validatetoken)

router.post('/expense', expenseController.createExpense)
router.get('/expense', expenseController.readExpenses)
router.put('/expense', expenseController.updateExpense)
router.delete('/expense', expenseController.deleteExpense)

router.post('/resetpassword', authController.resetPassword)

export default router
