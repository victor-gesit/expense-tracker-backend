"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var jwtSecret = process.env.JWT_SECRET;
var _default = {
  createExpense: function createExpense(req, res) {
    return res.status(200).send({
      message: 'Create Expense'
    });
  },
  readExpense: function readExpense(req, res) {
    return res.status(200).send({
      message: 'Read Expense'
    });
  },
  updateExpense: function updateExpense(req, res) {
    return res.status(200).send({
      message: 'Update Expense'
    });
  },
  deleteExpense: function deleteExpense(req, res) {
    return res.status(200).send({
      message: 'Delete Expense'
    });
  }
};
exports["default"] = _default;