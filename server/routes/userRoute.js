const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get("/me", authenticateMiddleware, userController.getMe);
router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"] }));
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/login/success", userController.getSocialUserLogin);
router.get("/login/failed", userController.getSocialUserFail);
router.get("/logout", userController.getSocialUserLogout);

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    successRedirect: '/login/success',
    session: true,
  }), 
  (req, res) => {
    console.log('Google called us back!');
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
