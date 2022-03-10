const { Op } = require("sequelize");
const db = require("../models");

class FilterOrder {
  id;
  return_location;
  refund;
  booking_status;
  pickup_location;
  booking_no;
  start_datetime;
  end_datetime;
    static fromQuery(query) {
      const _filterOrder = new FilterOrder();
      _filterOrder.id = query["id"];
      _filterOrder.return_location = query["return_location"];
      _filterOrder.refund = query["refund"];
      _filterOrder.booking_status = query["booking_status"];
      _filterOrder.pickup_location = query["pickup_location"];
      _filterOrder.booking_no = query["booking_no"];
      _filterOrder.start_datetime = query["start_datetime"];
      _filterOrder.end_datetime = query["end_datetime"];
      return _filterOrder;
    }
  }
  
const getOrderList = async (paginate, filterOrder) => {
  var withFilter;
  if (filterOrder.id) {
    withFilter = {
      id: {
        [Op.like]: `%${filterOrder.id}%`,
      },
    };
  } else if (filterOrder.return_location) {
    withFilter = {
      return_location: {
        [Op.like]: `%${filterOrder.return_location}%`,
      },
    };
  } else if (filterOrder.refund) {
    withFilter = {
      refund: {
        [Op.like]: `%${filterOrder.refund}%`,
      },
    };
  } else if (filterOrder.booking_status) {
    withFilter = {
      booking_status: {
        [Op.like]: `%${filterOrder.booking_status}%`,
      },
    };
  } else if (filterOrder.pickup_location) {
    withFilter = {
      pickup_location: {
        [Op.like]: `%${filterOrder.pickup_location}%`,
      },
    };
  } else if (filterOrder.booking_no) {
    withFilter = {
      booking_no: {
        [Op.like]: `%${filterOrder.booking_no}%`,
      },
    };
  } else if (filterOrder.start_datetime) {
    withFilter = {
      start_datetime: {
        [Op.like]: `%${filterOrder.start_datetime}%`,
      },
    };
  } else if (filterOrder.end_datetime) {
    withFilter = {
      end_datetime: {
        [Op.like]: `%${filterOrder.end_datetime}%`,
      },
    };
  }

  const totalResult = await db.Order.count();
  if (withFilter == undefined) {
    const result = await db.Order.findAll({
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
    const result = await db.Order.findAll({
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
  
exports.getOrderAll = async (req, res, next) => {
    try {
      const countOrder = await db.Order.count();
      if (countOrder === 0) {
        res.status(400).json({
          message: "No Order"
        });
      }
      const offset = Number(req.query["offset"]);
      const limit = Number(req.query["limit"]);
      const paginate = {
        offset: isNaN(offset) ? 0 : offset,
        limit: isNaN(limit) ? 10 : limit,
      };
      const data = await getOrderList(
        paginate,
        FilterOrder.fromQuery(req.query)
      );
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const dataOrder = await db.Order.findOne({
        where: {
          id: {
            [Op.eq]: orderId,
          },
        },
      });

      if (!dataOrder) {
        return res.status(400).json({
          message: "this order not found"
        })
      }
    res.status(200).json({ data: dataOrder });

    } catch (err) {
      next(err);
    }
};

exports.updateOrderById = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const dataOrder = await db.Order.findOne({
        where: {
          id: {
            [Op.eq]: orderId,
          },
        },
      });
      if (!dataOrder) {
        return res.status(400).json({
          message: "this order not found"
        })
      }

      if (req.query["return_location"]) {
        dataOrder.return_location = req.query["return_location"];
      }
      if (req.query["refund"]) {
        dataOrder.refund = req.query["refund"];
      }
      if (req.query["booking_status"]) {
        dataOrder.booking_status = req.query["booking_status"];
      }
      if (req.query["pickup_location"]) {
        dataOrder.pickup_location = req.query["pickup_location"];
      }
      if (req.query["booking_no"]) {
        dataOrder.booking_no = req.query["booking_no"];
      }
      if (req.query["start_datetime"]) {
        dataOrder.start_datetime = Date.parse(req.query["start_datetime"]);
      }
      if (req.query["end_datetime"]) {
        dataOrder.end_datetime = Date.parse(req.query["end_datetime"]);
      }
      await dataOrder.save();
      return res.status(200).json({ message: "this order was updated" });
    } catch (err) {
      next(err);
    }
};
