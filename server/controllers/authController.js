const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../models');
const { Op } = require("sequelize");

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password, 
      first_name,
      last_name,
    } = req.body;

    const isEmail = emailFormat.test(email);
    if (isEmail) {
      const existUser = await User.findOne({
        where: { email: email }
      });

      if (existUser) {
        return res
          .status(400)
          .json({ message: 'this email is already in use' });
      }
    } 

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: isEmail ? email : Error,
      first_name,
      last_name,
      phone_number: null,
      role: 'user',
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    res.status(201).json({ message: 'สมัครใช้งานสำเร็จ' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isEmail = emailFormat.test(email);

    let user;
    if (isEmail) {
      user = await User.findOne({ where: { email: email } });
    } 

    if (!user) {
      return res
        .status(400)
        .json({ message: 'invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'invalid email or password' });
    }

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30
    });

    const { id, first_name, last_name, phone_number, role } = user;

    res.status(200).json({
      token,
      user: { id, first_name, last_name, phone_number, role, email },
      message: 'เข้าสู่ระบบสำเร็จ'
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => { 
  try {
    const { email } = req.body;
    const isEmail = emailFormat.test(email);

    let user;
    if (isEmail) {
      user = await User.findOne({ where: { email: email } });
    } 

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'ไม่พบ Email ในระบบ'
        });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const sendReset = await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: 'mySqlDemoEmail@gmail.com',
      to: `${user.email}`,
      subject: 'Link To Reset Password',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
        + `http://localhost:3000/reset/${token}\n\n`
        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };
    console.log('sending mail');
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        return res.status(200).json({
          message: 'ส่ง Link Reset รหัสผ่านไปให้ทาง Email แล้ว'
        });
      }
    });

  } catch (err) {
    next(err);
  }
}

exports.resetPassword = async (req, res, next) => { 
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      }
    })

    if (!user) {
     return res.status(403).json({
        message: 'password reset link is invalid or has expired'
      });
    }

    return res.status(200).json({
      email: user.email,
      message: 'password reset link ok',
    });
  } catch (err) {
    next(err);
  }
}

exports.updatePassword = async (req, res, next) => { 
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      }
    });

    if (!user) {
      return res.status(403).json({
        message: 'password reset link is invalid or has expired'
      });
    };

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return res.status(200).json({
      message: 'password updated successfully.'
    });
    
  } catch (err) {
    next(err);
  }
}


