'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.ShowTime, {targetKey : 'showTimeID', foreignKey : 'showTimeID', as : 'showTime'})
    }
  }
  Seat.init({
    seatID : DataTypes.STRING,
    numberSeat: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};