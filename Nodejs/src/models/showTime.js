'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowTime.hasOne(models.Fare, {sourceKey : 'showTimeID', foreignKey : 'showTimeID', as : 'showTime'})
      ShowTime.hasMany(models.Seat, {sourceKey : 'showTimeID'})
      ShowTime.hasMany(models.Ticket, {sourceKey : 'showTimeID'})
      ShowTime.belongsTo(models.MovieDate, {targetKey : 'movieDateID', foreignKey : 'movieDateID', as : 'movieDate'})

    }
  }
  ShowTime.init({
    showTimeID : DataTypes.STRING,
    time: DataTypes.TIME,
    quality : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ShowTime',
  });
  return ShowTime;
};