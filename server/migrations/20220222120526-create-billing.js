'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('billings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'orders'
          },
          key: 'id'
        }
      },
      bill_date: {
        type: Sequelize.DATE
      },
      paid_date: {
        type: Sequelize.DATE
      },
      bill_status: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('billings');
  }
};