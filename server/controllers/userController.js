const { User } = require('../models');

exports.getMe = (req, res, next) => {
  const { id, first_name, last_name, phone_number, email, role } = req.user;
  res
    .status(200)
    .json({
      user: { id, first_name, last_name, phone_number, email, role }
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

exports.editUserProfile = async (req, res, next) => {
  const { id } = req.user;
  const { first_name, last_name, phone_number, email } = req.body;
  const userInfo = await User.findOne({
    where: id
  });

  if (!userInfo) {
    return res.status(401).json({
      success: false,
      message: 'ไม่พบ User'
    })
  }

  await userInfo.update({
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    email: email
  });
  return res.status(200).json({
    message: 'แก้ไขข้อมูลเรียบร้อย'
  })
};

exports.editUserPassword = (req, res, next) => {
  const { id, first_name, last_name, phone_number, email, status } = req.user;

};

