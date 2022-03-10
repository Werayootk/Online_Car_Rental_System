const express = require("express");
const bookingController = require('../controllers/bookingController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get('/booking-list', authenticateMiddleware, bookingController.getBookingList); //tested
router.get('/booking-status/:booking_no', authenticateMiddleware, bookingController.getBookingByStatus); //tested
router.patch('/cancel-booking/:booking_no', authenticateMiddleware, bookingController.cancelBookingById); //tested

module.exports = router;
