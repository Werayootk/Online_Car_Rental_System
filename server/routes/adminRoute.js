const express = require("express");

const customerController = require('../controllers/customerController');
const authWithAdmin = require('../middlewares/authWithAdmin');

const router = express.Router();
router.get("/customer", authWithAdmin, customerController.getCustomerAll);

module.exports = router;
