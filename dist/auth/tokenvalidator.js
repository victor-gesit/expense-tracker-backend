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
  validatetoken: function validatetoken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
      _jsonwebtoken["default"].verify(token, jwtSecret, function (err, decoded) {
        if (err) {
          return res.status(402).send({
            message: 'Could not authenticate token',
            error: err
          });
        }

        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).send({
        message: 'No Authentication Provided',
        success: false
      });
    }
  }
};
exports["default"] = _default;