const { Op } = require("sequelize");
const db = require("../models");

 exports.updateBillStatusByUser = async (req, res, next) => {
    try {
      /**
       * 1. Query data from booking_no and ? order_no and bill_id booking_status='status' bill_status='status'
       * 2. get data from 2 database order and bill
       * 3. update value status both of db
       * 4. save()
       * 5. return res
       */
      const { booking_no, booking_status, bill_status } = req.params;
      const getBooking = await db.Order.findOne({
        where: {
          [Op.eq]: {
            booking_no: booking_no
          }
        }
      });

      if (getBooking) {
        return res.status(400).json({
          message: 'Not found booking number.'
        })  
      };

      const getBill = await db.Billing.findOne({
        where: {
          [Op.eq]: {
            order_id: getBooking.id
          }
        }
      });
      getBill.bill_status = bill_status;
      getBooking.booking_status = booking_status;
      await getBill.save();
      await getBooking.save();
      
      res.status(200).json({
        message: 'Order and Bill is updated.'
      })
    } catch (err) {
      next(err);
    }
};