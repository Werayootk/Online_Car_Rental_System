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

exports.getSocialUserLogin = async (req, res, next) => {
  if (req.user) {
    let existUser;
    const oauthUser = {
      social_id: req.user.id,
      first_name: req.user.name.givenName,
      last_name: req.user.name.familyName,
      email: req.user.emails[0].value,
      role: "user"
    }
    console.log(oauthUser);
   // existUser = await User.findOne({ where: {email: req._json.email}})
    //const payload = {
     // id: existUser.id,
    //   social_id: req.user.id,
    //   first_name: req.user.name.givenName,
    //   last_name: req.user.name.familyName,
    //   email: req._json.email,
    //   role: "user"
    // };
    // const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    //   expiresIn: 60 * 60 * 24 * 30
    // });
   // const { id, first_name, last_name, phone_number, role } = existUser;

    res.status(200).json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ",
      //existUser: { id, first_name, last_name, phone_number, role },
      //token,
      user: req.user,

    });
  }
};

/**
 * 
 * {
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "user": {
    "id": "101507751193637809567",
    "displayName": "Werayoot Kunphai",
    "name": {
      "familyName": "Kunphai",
      "givenName": "Werayoot"
    },
    "emails": [
      {
        "value": "werayoot5800@gmail.com",
        "verified": true
      }
    ],
    "photos": [
      {
        "value": "https://lh3.googleusercontent.com/a-/AOh14GiLPOUeIkflU6sIhFnr_trWKatZE02oVt8WhAlyruI=s96-c"
      }
    ],
    "provider": "google",
    "_raw": "{\n  \"sub\": \"101507751193637809567\",\n  \"name\": \"Werayoot Kunphai\",\n  \"given_name\": \"Werayoot\",\n  \"family_name\": \"Kunphai\",\n  \"picture\": \"https://lh3.googleusercontent.com/a-/AOh14GiLPOUeIkflU6sIhFnr_trWKatZE02oVt8WhAlyruI\\u003ds96-c\",\n  \"email\": \"werayoot5800@gmail.com\",\n  \"email_verified\": true,\n  \"locale\": \"en\"\n}",
    "_json": {
      "sub": "101507751193637809567",
      "name": "Werayoot Kunphai",
      "given_name": "Werayoot",
      "family_name": "Kunphai",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GiLPOUeIkflU6sIhFnr_trWKatZE02oVt8WhAlyruI=s96-c",
      "email": "werayoot5800@gmail.com",
      "email_verified": true,
      "locale": "en"
    }
  }
}
 */

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

