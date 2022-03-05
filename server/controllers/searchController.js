const { Op } = require("sequelize");
const db = require("../models");

/*
getCarListAll
    1. GET(limit,offset) search car from (start date(redux), end date(redux), location(redux), car status)
getCarDetailById
    2. GET Car detail from carID
createCarOrder
    3. POST Order
    ?car_id=&location=&user_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00
       - Genarate Booking_no format(user_id+car_id+location_id+datetime)
       - After create Order Create Bill
*/

exports.getCarListAll = async (req, res, next) => {
    try {
      /**
       * 1. Query data from Car By status avaliable with limit offset count 
       * 2. Query with filter Car type By ?car_type with limit offset count
       * 3. Query data with order aec or dsec car_price
       * 4. return data
       */
    } catch (err) {
      next(err);
    }
};


exports.getCarDetailById = async (req, res, next) => {
    try {
      /**
       * 1. Query data from carId
       * 2. return data
       */
    } catch (err) {
      next(err);
    }
};

exports.createCarOrder = async (req, res, next) => {
    try {
      /**
       * 1. create data from ?car_id=&location=&user_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00
       * 2. create to order and bill
       * 3. update data car_status
       */ 
    } catch (err) {
      next(err);
    }
};
