const express = require("express");
const authController = require("../controllers/authController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

/*
 
    1. GET(limit,offset) search car from (start date(redux), end date(redux), location(redux), car status)
    2. GET Car detail from carID
    3. POST Order
    ?car_id=&location=&user_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00
       - Genarate Booking_no format(user_id+car_id+location_id+datetime)
       - After create Order Create Bill
    4. after frontend will redirect to omise after completed payment
       UPDATE Order and Bill date and status
 */

module.exports = router;
