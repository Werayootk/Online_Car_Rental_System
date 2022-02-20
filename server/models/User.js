module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING(255)
    },
    last_name: {
      type: DataTypes.STRING(255)
    },
    tel: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    status: {
      type: DataTypes.STRING(10)
    }
  }, {
    tableName : 'users'
  });

  model.associate = models => {
    model.hasMany(models.Order, { foreignKey: 'user_id' }),
    model.hasOne(models.Login, { foreignKey: 'user_id' }),
    model.hasMany(models.Billing, { foreignKey: 'user_id' })
  };

  return model;
};

/*
uid
first_name
last_name
tel
email 
*/
