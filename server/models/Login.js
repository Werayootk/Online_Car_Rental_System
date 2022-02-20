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

    return model;
}

/**
 * username
 * password
 * access_by
 */