const express = require("express");
const searchController = require('../controllers/searchController');
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get('/car-list', authenticateMiddleware, searchController.getCarListAll); //tested
router.get('/location', searchController.getProvinceAndLocation); //tested
router.get('/car-detail/:carId', authenticateMiddleware, searchController.getCarDetailById); //tested
router.post('/create-booking', authenticateMiddleware, searchController.createCarOrder); //tested

module.exports = router;
