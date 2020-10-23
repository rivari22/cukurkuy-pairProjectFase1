'use strict';
const bcrypt = require("bcryptjs")

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
      User.belongsToMany(models.Service, {
        through: models.UserService,
        foreignKey: 'user_id'
      })
      User.hasMany(models.UserService, {
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'please fill in your username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'please fill in your password'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'please fill in your email'
        }
      }
    },
    gender: DataTypes.STRING,
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'please fill in your phone number'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, opt) {
        if(!instance.name) instance.name = instance.username
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};