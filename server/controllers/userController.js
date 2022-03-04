const { User } = require('../models');

exports.getMe = (req, res, next) => {
  const { id, first_name, last_name, phone_number, email, status } = req.user;
  res
    .status(200)
    .json({
      user: { id, first_name, last_name, phone_number, email, status }
    });
};

exports.getSocialUserLogin = (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful logged in",
      user: req.user,
      cookies: req.cookies
    });
  }
};

exports.getSocialUserFail = (req, res, next) => {
  res.status(401).json({
    success: false,
    message: "failure log in",
  });
};

exports.getSocialUserLogout = (req, res, next) => {
  req.logout();
  res.status(401).json({
    success: false,
    message: "log out",
  });
};