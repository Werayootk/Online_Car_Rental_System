module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Location', {
        province: {
            type: DataTypes.STRING(100)
          },
          location: {
            type: DataTypes.STRING(100)
          }
    }, {
        tableName: 'locations'
    });
  
  model.associate = models => {
  }

    return model;
}

/**
 * lid
 * province
 * location
 */