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
    }
  }, {
    tableName : 'users'
  });

  return model;
};

/*
uid
first_name
last_name
tel
email 
*/
