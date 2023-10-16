'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fareID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      isAdult: {
        type: Sequelize.BOOLEAN
      },
      isBeforeFiveHours: {
        type: Sequelize.BOOLEAN
      },
      pricesOfMonWednesThursDay: {
        type: Sequelize.INTEGER
      },
      pricesOfTuesDay: {
        type: Sequelize.INTEGER
      },
      pricesOfFriSaturSunHoliDay: {
        type: Sequelize.INTEGER
      },
      pricesOfGratitudeDay: {
        type: Sequelize.INTEGER
      },
      cinemaID: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fares');
  }
};