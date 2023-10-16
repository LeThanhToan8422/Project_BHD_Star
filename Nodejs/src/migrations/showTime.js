'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShowTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      showTimeID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME
      },
      quality: {
        type: Sequelize.STRING,
      },
      movieDateID: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShowTimes');
  }
};