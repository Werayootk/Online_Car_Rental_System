module.exports = (sequelize, DataTypes) => {
  const Billing = sequelize.define(
    "Billing",
    {
      bill_date: {
        type: DataTypes.DATE,
      },
      paid_date: {
        type: DataTypes.DATE,
      },
      bill_status: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      total_amount: {
        type: DataTypes.INTEGER,
      },
    },{
      timestamps: false
    }
  );

  Billing.associate = (models) => {
    Billing.belongsTo(models.User, {
      foreignKey: 'user_id',
      allowNull: false
    });

    Billing.belongsTo(models.Order, {
      foreignKey: 'order_id',
      allowNull: false
    });
  };

  return Billing;
};