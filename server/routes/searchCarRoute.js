const express = require("express");
const searchController = require('../controllers/searchController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get('/car-list', authenticateMiddleware, searchController.getCarListAll);
router.get('/car-detail/:carId', authenticateMiddleware, searchController.getCarDetailById);
router.post('/booking-detail', authenticateMiddleware, searchController.createCarOrder);
router.patch('/booking-update', authenticateMiddleware, searchController.updateOrderAndBillStatus);

module.exports = router;
