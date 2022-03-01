const express = require("express");

const customerController = require('../controllers/customerController');
const locationController = require("../controllers/locationController");
const carController = require('../controllers/carController');
const orderController = require('../controllers/orderController');

const authWithAdmin = require('../middlewares/authWithAdmin');
const upload = require('../middlewares/upload');

const router = express.Router();
router.get("/customer", authWithAdmin, customerController.getCustomerAll);
router.get("/customer/:customerId", authWithAdmin, customerController.getCustomerById);
router.patch("/customer/:customerId", authWithAdmin, customerController.updateCustomerById);
router.delete("/customer/:customerId", authWithAdmin, customerController.deleteCustomerById);

router.post("/location", authWithAdmin, locationController.addLocation);
router.get("/location", authWithAdmin, locationController.getLocationAll);
router.get("/location/:locationId", authWithAdmin, locationController.getLocationById);
router.patch("/location/:locationId", authWithAdmin, locationController.updateLocationById);
router.delete("/location/:locationId", authWithAdmin, locationController.deleteLocationById);

router.post("/car", authWithAdmin, upload.array('img', 5), carController.addCar);
router.get("/car", authWithAdmin, carController.getCarAll);
router.get("/car/:carId", authWithAdmin, carController.getCarById);
router.patch("/car/:carId", authWithAdmin, carController.updateCarById);
router.delete("/car/:carId", authWithAdmin, carController.deleteCarById);

router.post("/order", authWithAdmin, orderController.createOrder);
router.get("/order", authWithAdmin, orderController.getOrderAll);
router.get("/order/:orderId", authWithAdmin, orderController.getOrderById);
router.patch("/order/:orderId", authWithAdmin, orderController.updateOrderById);
router.delete("/order/:orderId", authWithAdmin, orderController.deleteOrderById);

module.exports = router;
