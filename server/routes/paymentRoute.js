const express = require("express");
const paymentController = require('../controllers/paymentController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.patch('/bill-status/:booking_no', authenticateMiddleware, paymentController.updateBillStatusByUser); // tested
router.post('/checkout-creditCard', authenticateMiddleware, paymentController.omiseCheckoutCreditCard);
router.post('/checkout-internetBanking', authenticateMiddleware, paymentController.omiseCheckoutInternetBanking);

module.exports = router;
