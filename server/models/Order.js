module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      return_location: {
        type: DataTypes.STRING,
      },
      refund: {
        type: DataTypes.STRING,
      },
      booking_status: {
        type: DataTypes.STRING,
      },
      pickup_location: {
        type: DataTypes.STRING,
      },
      booking_no: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      start_datetime: {
        type: DataTypes.DATE,
      },
      end_datetime: {
        type: DataTypes.DATE,
      },
    },{
      timestamps: false
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      allowNull: false
    });

    Order.hasOne(models.Billing, {
      foreignKey: 'order_id',
      allowNull: false
    });

    Order.belongsTo(models.Car, {
      foreignKey: 'car_id',
      allowNull: false
    });  
  };

  return Order;
};
