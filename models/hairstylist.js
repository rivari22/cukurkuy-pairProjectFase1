'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hairstylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hairstylist.hasOne(models.UserService, {
        foreignKey: 'hairstylist_id'
      });
    }

    full_name() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  Hairstylist.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hairstylist',
  });
  return Hairstylist;
};