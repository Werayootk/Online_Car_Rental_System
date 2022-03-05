const express = require("express");
const paymentController = require('../controllers/paymentController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.patch('/bill-status/:booking_no', authenticateMiddleware, paymentController.updateBillStatusByUser);

module.exports = router;
