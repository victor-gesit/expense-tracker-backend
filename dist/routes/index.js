"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _tokenvalidator = _interopRequireDefault(require("../auth/tokenvalidator"));

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _expenseController = _interopRequireDefault(require("../controllers/expenseController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signin', _authController["default"].signin);
router.post('/signup', _authController["default"].signup);
router.post('/resetpassword', _authController["default"].resetpassword);
router.use(_tokenvalidator["default"].validatetoken);
router.post('/create-expense', _expenseController["default"].createExpense);
router.get('/read-expenses', _expenseController["default"].readExpense);
router.post('/update-expense', _expenseController["default"].updateExpense);
router["delete"]('/delete-expense', _expenseController["default"].deleteExpense);
var _default = router;
exports["default"] = _default;