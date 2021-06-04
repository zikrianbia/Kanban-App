'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name is required"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail:{
          msg: `Email must be an email`
        },
        notEmpty: {
          msg: `Email Required`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Password Required`
        },
        len:{
          args: [6,255],
          msg: `Password Must More Than 6 Characters`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opt) => {
    const hashed = hashPassword(user.password)
    user.password = hashed
  })

  return User;
};