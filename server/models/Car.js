module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      car_brand: {
        type: DataTypes.STRING,
        unique: true,
      },
      car_register: {
        type: DataTypes.STRING,
      },
      car_type: {
        type: DataTypes.STRING,
      },
      car_transmission: {
        type: DataTypes.STRING,
      },
      car_seat: {
        type: DataTypes.STRING,
      },
      car_status: {
        type: DataTypes.STRING,
      },
      car_price: {
        type : DataTypes.INTEGER
      }
    },{
      timestamps: false
    }
  );

  Car.associate = (models) => {
    Car.hasOne(models.Order, {
      foreignKey: 'car_id',
      allowNull: false
    });

    Car.hasMany(models.Image_car, {
      foreignKey: 'car_id',
      allowNull: false
    });
  };

  return Car;
};
