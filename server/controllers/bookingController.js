const { Op } = require("sequelize");
const db = require("../models");

/**
 * GET Order all (frontend will categary by status) by user 
 * GET Order No to show step 4 by status
 * patch Order cancel status by id
 */

exports.getBookingList = async (req, res, next) => {
    try {
      const { userId } = req.params
      /**
       * 1. Query Data Booking(Order) by userId include model (user, billing, car)
       * 2. return data
       */
    } catch (err) {
      next(err);
    }
};

exports.getBookingByStatus = async (req, res, next) => {
    try {
      /**
       * 1. Query Data Booking(Order) by status from ? Booking_no include model (user, billing, car)
       * 2. return data
       */
    } catch (err) {
     next(err);
    }
};

exports.cancelBookingById = async (req, res, next) => {
    try {
      /**
       * 1. Query Data Booking(Order) ? Booking_no 
       * 2. return data
       */
    } catch (err) {
      next(err);
    }
};