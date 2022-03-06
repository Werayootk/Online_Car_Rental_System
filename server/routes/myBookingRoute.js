const express = require("express");
const bookingController = require('../controllers/bookingController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get('/booking-list/:userId', authenticateMiddleware, bookingController.getBookingList);
router.get('/booking-status/:userId', authenticateMiddleware, bookingController.getBookingByStatus);
router.patch('/cancel-booking/:userId', authenticateMiddleware, bookingController.cancelBookingById);

module.exports = router;
