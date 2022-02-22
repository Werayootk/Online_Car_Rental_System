module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      province: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      }
    },{
      timestamps: false
    }
  );

  return Location;
};
