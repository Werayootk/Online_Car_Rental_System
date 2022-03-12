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
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
      }
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
