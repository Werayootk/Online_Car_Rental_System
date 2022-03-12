const { Op } = require("sequelize");
const db = require("../models");
class FilterBill {
  id;
  bill_date;
  paid_date;
  bill_status;
  amount;
  total_amount;
    static fromQuery(query) {
      const _filterBill = new FilterBill();
      _filterBill.id = query["id"];
      _filterBill.bill_date = query["bill_date"];
      _filterBill.paid_date = query["paid_date"];
      _filterBill.bill_status = query["bill_status"];
      _filterBill.amount = query["amount"];
      _filterBill.total_amount = query["total_amount"];
      return _filterBill;
    }
  }
  
  const getBillList = async (paginate, filterBill) => {
    var withFilter;
    if (filterBill.id) {
      withFilter = {
        id: {
          [Op.like]: `%${filterBill.id}%`,
        },
      };
    } else if (filterBill.bill_date) {
      withFilter = {
        bill_date: {
          [Op.like]: `%${filterBill.bill_date}%`,
        },
      };
    } else if (filterBill.paid_date) {
      withFilter = {
        paid_date: {
          [Op.like]: `%${filterBill.paid_date}%`,
        },
      };
    } else if (filterBill.bill_status) {
      withFilter = {
        bill_status: {
          [Op.like]: `%${filterBill.bill_status}%`,
        },
      };
    } else if (filterBill.amount) {
      withFilter = {
        amount: {
          [Op.like]: `%${filterBill.amount}%`,
        },
      };
    } else if (filterBill.total_amount) {
      withFilter = {
        total_amount: {
          [Op.like]: `%${filterBill.total_amount}%`,
        },
      };
    } 
  
    const totalResult = await db.Billing.count();
    if (withFilter == undefined) {
      const result = await db.Billing.findAll({
        offset: paginate.offset,
        limit: paginate.limit,
        order: [["id", "desc"]],
      });
      return {
        data: result,
        total: totalResult,
        offset: paginate.offset,
        limit: paginate.limit,
      };
    } else {
      const result = await db.Billing.findAll({
        where: {
          [Op.or]: [withFilter],
        },
        offset: paginate.offset,
        limit: paginate.limit,
        order: [["id", "desc"]],
      });
      return {
        data: result,
        total: totalResult,
        offset: paginate.offset,
        limit: paginate.limit,
      };
    }
};
  
exports.getBillAll = async (req, res, next) => {
    try {
      const countBill = await db.Billing.count();
      if (countBill === 0) {
        res.status(400).json({
          message: "No Bill"
        });
      }
      const offset = Number(req.query["offset"]);
      const limit = Number(req.query["limit"]);
      const paginate = {
        offset: isNaN(offset) ? 0 : offset,
        limit: isNaN(limit) ? 10 : limit,
      };
      const data = await getBillList(
        paginate,
        FilterBill.fromQuery(req.query)
      );
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
};

exports.getBillById = async (req, res, next) => {
    try {
      const { billID } = req.params;

      const dataBill = await db.Billing.findOne({
        where: {
          id: {
            [Op.eq]: billID,
          },
        },
      });

      if (!dataBill) {
        return res.status(400).json({
          message: "this bill not found"
        })
      }
    res.status(200).json({ data: dataBill });

    } catch (err) {
      next(err);
    }
};

exports.updateBillById = async (req, res, next) => {
    try {
      const { billID } = req.params;

      const dataBill = await db.Billing.findOne({
        where: {
          id: {
            [Op.eq]: billID,
          },
        },
      });
      if (!dataBill) {
        return res.status(400).json({
          message: "this Bill not found"
        })
      }
      // 2013-08-03T02:00:00Z
      if (req.query["bill_date"]) {
        dataBill.bill_date = Date.parse(req.query["bill_date"]);
      }
      if (req.query["paid_date"]) {
        dataBill.paid_date = Date.parse(req.query["paid_date"]);
      }
      if (req.query["bill_status"]) {
        dataBill.bill_status = req.query["bill_status"];
      }
      if (req.query["amount"]) {
        dataBill.amount = Number(req.query["amount"]);
      }
      if (req.query["total_amount"]) {
        dataBill.total_amount = Number(req.query["total_amount"]);
      }
    await dataBill.save();
    res.status(200).json({ message: "Bill was updated." });
    } catch (err) {
      next(err);
    }
};
