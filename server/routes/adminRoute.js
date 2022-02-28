const express = require("express");

const customerController = require('../controllers/customerController');
const locationController = require("../controllers/locationController");
const authWithAdmin = require('../middlewares/authWithAdmin');

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

module.exports = router;
