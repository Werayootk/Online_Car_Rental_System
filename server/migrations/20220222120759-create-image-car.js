'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'cars'
          },
          key: 'id'
        }
      },
      img_url: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('image_cars');
  }
};