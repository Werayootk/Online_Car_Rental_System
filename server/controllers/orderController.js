const { Op } = require("sequelize");
const db = require("../models");

class FilterOrder {
    id;
    static fromQuery(query) {
      const _filterOrder = new FilterOrder();
      _filterOrder.id = query["id"];
      return _filterOrder;
    }
  }
  
const getOrderList = async (paginate, filterCustomer) => {
    
};
  
exports.getOrderAll = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.updateOrderById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.deleteOrderById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};