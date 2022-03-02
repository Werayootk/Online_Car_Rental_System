'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      return_location: {
        type: Sequelize.STRING
      },
      refund: {
        type: Sequelize.STRING
      },
      booking_status: {
        type: Sequelize.STRING
      },
      start_datetime: {
        type: Sequelize.DATE
      },
      end_datetime: {
        type: Sequelize.DATE
      },
      pickup_location: {
        type: Sequelize.STRING
      },
      booking_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};