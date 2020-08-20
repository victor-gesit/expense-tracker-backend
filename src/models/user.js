import bcrypt from 'bcrypt'

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email is already in use'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'An invalid email was supplied'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'Password must be 10 characters long with no leading or trailing spaces'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5), null);
  });

  return User;
};