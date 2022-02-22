module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
    },{
      timestamps: false
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: "user_id",
      allowNull: false
    });

    User.hasMany(models.Billing, {
      foreignKey: "user_id",
      allowNull: false
    });
  };

  return User;
};
