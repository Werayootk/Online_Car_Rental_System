require("dotenv").config();
require("./config/passport");

const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const passport = require('passport');

const db = require("./models");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const searchCarRoute = require('./routes/searchCarRoute');
const myBookingRoute = require('./routes/myBookingRoute');
const paymentRoute = require('./routes/paymentRoute');
const morganMiddleware = require("./middlewares/morganMiddleware");
const app = express();
app.use(morganMiddleware);

app.use(cors({
  origin: "*",
}));
app.use(helmet());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY_ONE, process.env.COOKIE_KEY_TWO],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use('/search-car', searchCarRoute);  
app.use('/booking', myBookingRoute);
app.use('/payment', paymentRoute);

app.use((req, res) => {
  res.status(404).json({ message: "resource not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
