module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Order', {
        start_datetime: {
            type: DataTypes.DATE
          },
          end_datetime: {
            type: DataTypes.DATE
          },
          pickup_location: {
            type: DataTypes.STRING(100)
          },
          return_location: {
            type: DataTypes.STRING(100)
        },
        refund: {
            type: DataTypes.STRING(100)
          },
          booking_status: {
            type: DataTypes.STRING(100)
          }
    }, {
        tableName: 'orders'
    });

    return model;
}

/**
 * uid
 * cid
 * oid
 * start_datetime
 * end_datetime
 * pickup_location
 * return_location
 * refund
 * booking_status
 */