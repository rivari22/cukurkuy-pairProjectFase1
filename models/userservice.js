'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserService.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      UserService.belongsTo(models.Service, {
        foreignKey: 'service_id'
      })
      UserService.belongsTo(models.Hairstylist, {
        foreignKey: 'hairstylist_id'
      })
    }
  };
  UserService.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    hairstylist_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserService',
  });
  return UserService;
};