'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_brand: {
        type: Sequelize.STRING,
        unique: true
      },
      car_register: {
        type: Sequelize.STRING
      },
      car_type: {
        type: Sequelize.STRING
      },
      car_transmission: {
        type: Sequelize.STRING
      },
      car_seat: {
        type: Sequelize.STRING
      },
      car_status: {
        type: Sequelize.STRING
      },
      car_price: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};