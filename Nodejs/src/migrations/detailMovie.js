'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detailMovieID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      movieContent: {
        type: Sequelize.STRING,
      },
      movieID: {
        type: Sequelize.STRING,
        unique: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailMovies');
  }
};