module.exports = (sequelize, DataTypes) => {
  const Image_car = sequelize.define(
    "Image_car",
    {
      img_url: {
        type: DataTypes.STRING,
      }
    },{
      timestamps: false
    }
  );

  Image_car.associate = (models) => {
    Image_car.belongsTo(models.Car, {
      foreignKey: 'car_id',
      allowNull: false
    });
  };

  return Image_car;
};