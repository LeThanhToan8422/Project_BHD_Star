'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      nameEN: {
        type: Sequelize.STRING,
      },
      nameVN: {
        type: Sequelize.STRING
      },
      evaluate: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      producer: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      premiereDate: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      contentFilm: {
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};