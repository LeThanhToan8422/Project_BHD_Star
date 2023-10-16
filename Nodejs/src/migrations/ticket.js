'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      quantityTickets: {
        type: Sequelize.INTEGER,
      },
      seats: {
        type: Sequelize.STRING,
      },
      combos: {
        type: Sequelize.STRING,
      },
      totalPrices: {
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.STRING
      },
      movieID: {
        type: Sequelize.STRING,
      },
      cinemaID: {
        type: Sequelize.STRING,
      },
      movieDateID: {
        type: Sequelize.STRING
      },
      showTimeID: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};