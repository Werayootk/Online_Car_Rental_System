module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Role', {
        status: {
            type: DataTypes.STRING(10)
        }
    }, {
        tableName : 'role'
    });

    return model;
}
/**
 * 
 * status (guest,user,admin)
 */