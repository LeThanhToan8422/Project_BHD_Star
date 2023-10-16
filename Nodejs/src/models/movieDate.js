'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieDate.hasOne(models.Fare, {sourceKey : 'movieDateID', foreignKey : 'movieDateID', as : 'movieDate'})
      MovieDate.hasMany(models.ShowTime, {sourceKey : 'movieDateID'})
      MovieDate.hasMany(models.Ticket, {sourceKey : 'movieDateID'})
      MovieDate.belongsTo(models.Cinema, {targetKey : 'cinemaID', foreignKey : 'cinemaID', as : 'cinema'})
      MovieDate.belongsTo(models.Movie, {targetKey : 'movieID', foreignKey : 'movieID', as : 'movie'})
    }
  }
  MovieDate.init({
    movieDateID : DataTypes.STRING,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'MovieDate',
  });
  return MovieDate;
};