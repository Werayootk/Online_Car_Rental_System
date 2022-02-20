module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Login', {
        username: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(255)
          },
          access_by: {
            type: DataTypes.STRING(100)
          }
    }, {
        tableName: 'login'
    });

    model.associate = models => {
     model.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return model;
}

/**
 * username
 * password
 * access_by
 */