module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Image_car', {
        img_url: {
            type: DataTypes.STRING(255)
          }
    }, {
        tableName: 'image_car'
    });

    return model;
}

/**
 * img_id
 * cid
 * img_url
 */