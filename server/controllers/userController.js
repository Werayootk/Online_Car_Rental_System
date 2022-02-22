const { User } = require('../models');

exports.getMe = (req, res, next) => {
  const { id, first_name, last_name, phone_number, email, status } = req.user;
  res
    .status(200)
    .json({
      user: { id, first_name, last_name, phone_number, email, status }
    });
};
