const { Op } = require("sequelize");
const db = require("../models");

/**
 * 1. UPDATE status bill order after paid
 * find from ? order_no and find bill_id
 */

 exports.updateBillStatusByUser = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};