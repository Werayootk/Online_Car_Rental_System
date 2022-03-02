require("dotenv").config();

const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get("/me", authenticateMiddleware, userController.getMe);
router.post("/register", authController.register);
router.post("/login", authController.login);

// router.post("/order", authWithAdmin, orderController.createOrder); ==> Create By user
// router.post("/bill", authWithAdmin, billController.createOrder); ==> Create By user

router.get("/google", passport.authenticate("google", { scope: ["email"] }));
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

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

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful logged in",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
