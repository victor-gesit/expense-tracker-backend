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
  signin: function signin(req, res) {
    return res.status(200).send({
      message: 'Sign in'
    });
  },
  signup: function signup(req, res) {
    return res.status(200).send({
      message: 'Sign in'
    });
  },
  resetpassword: function resetpassword(req, res) {
    return res.status(200).send({
      message: 'password reset'
    });
  }
};
exports["default"] = _default;