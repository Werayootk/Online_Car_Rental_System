const { Op } = require("sequelize");
const db = require("../models");

class FilterCar {
    id;
    static fromQuery(query) {
      const _filterCar = new FilterCar();
      _filterCar.id = query["id"];
      return _filterCar;
    }
  }
  
const getCarList = async (paginate, filterCustomer) => {
    
};
  
exports.getCarAll = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.getCarById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.updateCarById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.addCar = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};

exports.deleteCarById = async (req, res, next) => {
    try {

    } catch (err) {
      next(err);
    }
};