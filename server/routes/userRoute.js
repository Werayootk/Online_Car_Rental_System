const express = require("express");
const passport = require("passport");

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
router.get("/google/login/success", userController.getSocialUserLogin);
router.get("/google/user/login/failed", userController.getSocialUserFail);
router.get("/logout", userController.getSocialUserLogout);

router.get("/me", authenticateMiddleware, userController.getMe); //tested
router.put("/edit-profile", authenticateMiddleware, userController.editUserProfile);
router.put("/edit-password", authenticateMiddleware, userController.editUserPassword);

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: 'user/login/failed',
    successRedirect: CLIENT_URL,
    session: true,
  })
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
