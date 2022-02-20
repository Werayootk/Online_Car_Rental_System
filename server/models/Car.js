module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Car', {
        car_brand: {
            type: DataTypes.STRING(100)
          },
          car_register: {
            type: DataTypes.STRING(10)
          },
          car_type: {
            type: DataTypes.STRING(100)
          },
          car_transmission: {
            type: DataTypes.STRING(100)
        },
        car_seat: {
            type: DataTypes.STRING(100)
          },
          car_status: {
            type: DataTypes.STRING(100)
          }
    }, {
        tableName: 'cars'
    });

    return model;
}

/**
 * cid
 * car_brand
 * car_register
 * car_type
 * car_transmission
 * car_seat
 * car_status
 */