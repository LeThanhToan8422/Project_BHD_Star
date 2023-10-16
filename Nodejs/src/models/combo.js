'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Combo.belongsTo(models.Cinema, {targetKey : 'cinemaID', foreignKey : 'cinemaID', as : 'cinema'})
    }
  }
  Combo.init({
    comboID : DataTypes.STRING,
    name : DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Combo',
  });
  return Combo;
};