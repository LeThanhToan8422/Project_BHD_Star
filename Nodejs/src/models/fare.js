'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fare.belongsTo(models.Cinema, {targetKey : 'cinemaID', foreignKey : 'cinemaID', as : 'cinema'})
    }
  }
  Fare.init({
    fareID : DataTypes.STRING,
    isAdult : DataTypes.BOOLEAN,
    isBeforeFiveHours : DataTypes.BOOLEAN,
    pricesOfMonWednesThursDay: DataTypes.INTEGER,
    pricesOfTuesDay: DataTypes.INTEGER,
    pricesOfFriSaturSunHoliDay: DataTypes.INTEGER,
    pricesOfGratitudeDay: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Fare',
  });
  return Fare;
};