const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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
      message: "เข้าสู่ระบบสำเร็จ",
      user: req.user,
    });
  }
};

exports.getSocialUserFail = (req, res, next) => {
  res.status(401).json({
    success: false,
    message: "เข้าสู่ระบบไม่สำเร็จ",
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
      message: 'แก้ไขข้อมูลไม่สำเร็จ'
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

exports.editUserPassword = async (req, res, next) => {
  const { id } = req.user;
  const { oldPassword, password } = req.body;
  
  const existUser = await User.findOne({
    where: {
      id: id,
    }
  });

  if (!existUser) {
    return res.status(401).json({
      success: false,
      message: 'แก้ไขรหัสผ่านไม่สำเร็จเนื่องจากรหัสผ่านอาจไม่ถูกต้อง'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await existUser.update({
    password: hashedPassword
  });
  return res.status(200).json({
    message: 'แก้ไขข้อมูลรหัสผ่านเรียบร้อย'
  })
};

