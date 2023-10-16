'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailMovie.belongsTo(models.Movie, {targetKey : 'movieID', foreignKey : 'movieID', as : 'movie'})
    }
  }
  DetailMovie.init({
    detailMovieID : DataTypes.STRING,
    movieContent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DetailMovie',
  });
  return DetailMovie;
};