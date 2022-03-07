const express = require("express");
const searchController = require('../controllers/searchController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get('/car-list', authenticateMiddleware, searchController.getCarListAll);
router.get('/location', authenticateMiddleware, searchController.getProvinceAndLocation);
router.get('/car-detail/:carId', authenticateMiddleware, searchController.getCarDetailById);
router.post('/booking-detail', authenticateMiddleware, searchController.createCarOrder);

module.exports = router;
