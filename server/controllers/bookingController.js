const { Op } = require("sequelize");
const db = require("../models");

/**
 * GET Order all (frontend will categary by status) by userId 
 * GET Order No to show step 4 by status
 * patch Order cancel status by id
 */
const getBookingStatusFilter = async (paginate, filterBookingStatus, userId) => {
  const countBookingStatusFilter = await db.Order.count({
    where: {
      [Op.and]: {
        [Op.eq]: {
         user_id : userId
        },
        [Op.eq]: {
          booking_status: filterBookingStatus
        }
      }
    },
  });
  const BookingStatusFilter = await db.Order.findAll({
    where: {
      [Op.and]: {
        [Op.eq]: {
         user_id : userId
        },
        [Op.eq]: {
          booking_status: filterBookingStatus
        }
      }
    },
  });
  return {
    data: BookingStatusFilter,
    total: countBookingStatusFilter,
    offset: paginate.offset,
    limit: paginate.limit,
  };
}

exports.getBookingList = async (req, res, next) => {
    try {
      /**
       * 1. Query Data Booking(Order) by userId include model (user, billing, car)
       * 2. return data
       * note frontend GET all Booking of user find Order include order include car ?booking_status
       */
      const { userId, booking_status } = req.params;
      const offset = Number(req.query["offset"]);
      const limit = Number(req.query["limit"]);
      const paginate = {
        offset: isNaN(offset) ? 0 : offset,
        limit: isNaN(limit) ? 3 : limit,
      };

      const countBookingStatus = await db.Order.count({
        where: {
          [Op.and]: {
            [Op.eq]: {
             user_id : userId
            },
            [Op.eq]: {
              booking_status: booking_status
            }
          }
        },
      });
  
      if (countBookingStatus == 0) {
        return res.status(400).json({
          message: "Not found booking status",
        });
      };

      const data = await getBookingStatusFilter(
        paginate,
        booking_status,
        userId
      );
      return res.status(200).json(data);

    } catch (err) {
      next(err);
    }
};

exports.getBookingByStatus = async (req, res, next) => {
    try {
      /**
       * 1. Query Data Booking(Order) by status from ? Booking_no include model (user, billing, car)
       * 2. return data
       * note frontend send ?booking_no find userId and carId
       */
      const { booking_no, userId } = req.params;
      const getBookingDetail = await db.User.findOne({
        where: {
          [Op.eq]: {
            id: userId
          }
        }, include: [{
          model: db.Order,
          as: 'Booking_data',
          where: { booking_no: booking_no }, include: [{
            model: db.Car,
            as: 'Car_data', include: [{
              model: db.Image_car,
              as: 'Image_car_url'
            }]
          }]
        }]
      });

      if (getBookingDetail) {
        return res.status(400).json({
          message: 'Not found this booking.'
        });
      }

      return res.status(200).json({
        data: getBookingDetail
      });
    } catch (err) {
     next(err);
    }
};

exports.cancelBookingById = async (req, res, next) => {
    try {
      /**
       * 1. Query Data Booking(Order) ? Booking_no 
       * 2. return data
       * note frontend send ?booking_no find and update status cancel
       */
      const { booking_no, userId } = req.params;

      const getBookingData = await db.User.findOne({
        where: {
          [Op.eq]: {
            id: userId
          },
          include: [{
            model: db.Order,
            as: 'Booking_data',
            where: { booking_no: booking_no }
          }]
        },
      });
      
      if (getBookingData) {
        return res.status(400).json({
          message: 'Not found this booking.'
        });
      }

      getBookingData.booking_status = 'cancel';
      await getBookingData.save();
      res.status(201).json({
        message: 'cancel this booking'
      });
    } catch (err) {
      next(err);
    }
};