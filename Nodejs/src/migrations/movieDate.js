'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovieDates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieDateID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE
      },
      cinemaID: {
        type: Sequelize.STRING,
      },
      movieID: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovieDates');
  }
};