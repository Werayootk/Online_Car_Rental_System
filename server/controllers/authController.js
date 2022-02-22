const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      status
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
      phone_number,
      status,
      password: hashedPassword
    });

    res.status(201).json({ message: 'user created' });
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
      last_name: user.last_name
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30
    });

    const { id, first_name, last_name, phone_number, status } = user;

    res.status(200).json({
      token,
      user: { id, first_name, last_name, phone_number, status, email }
    });
  } catch (err) {
    next(err);
  }
};
