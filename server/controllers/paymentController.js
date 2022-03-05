const { Op } = require("sequelize");
const db = require("../models");

/**
 * 1. UPDATE status bill order after paid
 * find from ? order_no and find bill_id
 */

 exports.updateBillStatusByUser = async (req, res, next) => {
    try {
      /**
       * 1. Query data from userId and ? order_no and bill_id
       * 2. get data from 2 database order and bill
       * 3. update value status both of db
       * 4. save()
       * 5. return res
       */
    } catch (err) {
      next(err);
    }
};