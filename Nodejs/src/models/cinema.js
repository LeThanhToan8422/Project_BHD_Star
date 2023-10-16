'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cinema.hasOne(models.Fare, {sourceKey : 'cinemaID', foreignKey : 'cinemaID', as : 'cinema'})
      Cinema.hasOne(models.Combo, {sourceKey : 'cinemaID'})
      Cinema.belongsTo(models.Place, {targetKey : 'placeID', foreignKey : 'placeID', as : 'place'})
      // Cinema.belongsToMany(models.Movie, {through : 'MovieDate' , sourceKey : 'cinemaID'})
      Cinema.hasMany(models.MovieDate, {sourceKey : 'cinemaID'})
      Cinema.hasMany(models.Ticket, {sourceKey : 'cinemaID'})
    }
  }
  Cinema.init({
    cinemaID : DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cinema',
  });
  return Cinema;
};