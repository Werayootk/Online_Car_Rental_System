module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Billing', {
        total_amount: {
            type: DataTypes.INTEGER
          },
          paid_date: {
            type: DataTypes.DATE
          },
          bill_date: {
            type: DataTypes.DATE
        },
        bill_status: {
            type: DataTypes.STRING(100)
          },
          amount: {
            type: DataTypes.INTEGER
          }
    }, {
        tableName: 'billings'
    });

    return model;
}

/**
 * bill_id
 * oid
 * uid
 * total_amount
 * paid_date
 * bill_date
 * bill_status
 * amount
 */