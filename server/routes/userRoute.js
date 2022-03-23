const express = require("express");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.post("/register", authController.register); //tested
router.post("/login", authController.login); //tested
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password", authController.resetPassword);
router.put("/update-password", authController.updatePassword);

//router.get("/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"] }));
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], }));
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/google/login/success", authenticateMiddleware,userController.getSocialUserLogin);
router.get("/google/user/login/failed", userController.getSocialUserFail);
router.get("/logout", userController.getSocialUserLogout);

router.get("/me", authenticateMiddleware, userController.getMe); //tested
router.put("/edit-profile", authenticateMiddleware, userController.editUserProfile);
router.put("/edit-password", authenticateMiddleware, userController.editUserPassword);

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: CLIENT_URL,
    //successRedirect: '/user/google/login/success',
    session: true,
  }),
  async (req, res) => {
    console.log('User -->', req.user)
    const user = req.user
    // Handle user with database --> new user (sign up --> create new user) / signin
    // Send jwt token back to frontend --> response / res.cookies

    if (req.user) {
      let existUser;
      existUser = await User.findOne({ where: {email: req.user.emails[0].value}})
      const payload = {
        id: existUser.id,
        social_id: req.user.id,
        first_name: req.user.name.givenName,
        last_name: req.user.name.familyName,
        email: req.user.emails[0].value,
        role: "user"
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 30
      });  
      // res.status(200).json({
      //   success: true,
      //   message: "เข้าสู่ระบบสำเร็จ",
      //   existUser: { id, first_name, last_name, phone_number, role },
      //   token,
      //   user: req.user,
      // });
      res.cookie('Authorization', token, {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours, // Lifetime
      })
      return res.redirect(CLIENT_URL);;
    }
  }
);

router.get('/facebook/callback', 
  passport.authenticate('facebook', {
    failureRedirect: '/login/failed',
    successRedirect: '/login/success',
    session: true,
  }), 
  (req, res) => {
    console.log('Facebook called us back!');
  }
);

module.exports = router;
