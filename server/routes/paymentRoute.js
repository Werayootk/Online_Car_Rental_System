const express = require("express");
const authController = require("../controllers/authController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

/**
 * 1. UPDATE status bill order after paid
 * find from ? order_no and find bill_id
 */

module.exports = router;
