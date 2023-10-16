'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, {targetKey : 'userID', foreignKey : 'userID', as : 'user'})
      Ticket.belongsTo(models.Movie, {targetKey : 'movieID', foreignKey : 'movieID', as : 'movie'})
      Ticket.belongsTo(models.Cinema, {targetKey : 'cinemaID', foreignKey : 'cinemaID', as : 'cinema'})
      Ticket.belongsTo(models.MovieDate, {targetKey : 'movieDateID', foreignKey : 'movieDateID', as : 'movieDate'})
      Ticket.belongsTo(models.ShowTime, {targetKey : 'showTimeID', foreignKey : 'showTimeID', as : 'showTime'})
    }
  }
  Ticket.init({
    // id, cinemaID, movieID, movieDateID, showTimeID, quanntityTickets, seats, combos, totalPrices
    ticketID: DataTypes.STRING,
    quantityTickets: DataTypes.INTEGER,
    seats: DataTypes.STRING,
    combos: DataTypes.STRING,
    totalPrices: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};