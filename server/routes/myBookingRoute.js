const express = require("express");
const authController = require("../controllers/authController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

/**
 * GET Order all (frontend will categary by status)
 * GET Order No to show step 4
 * patch Order cancel status
 */

module.exports = router;
