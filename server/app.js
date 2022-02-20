require('dotenv').config();
require('./config/passport');

const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/user');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    });
});