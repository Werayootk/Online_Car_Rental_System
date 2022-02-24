require("dotenv").config();
require("./config/passport");

const express = require("express");
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const cors = require("cors");
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const passport = require('passport');

const db = require("./models");
const userRoute = require("./routes/userRoute");

const app = express();
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());
app.use(helmet());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY_ONE, process.env.COOKIE_KEY_TWO],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoute);

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
