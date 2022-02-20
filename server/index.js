const db = require('./models');

db.sequelize.sync().then(() => {
    console.log('DataBase is sync');
});