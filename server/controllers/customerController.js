const { Op } = require("sequelize");
const db = require("../models");
class FilterCustomer {
  email;
  first_name;
  last_name;
  phone_number;
  id;
  static fromQuery(query) {
    const filter = new FilterCustomer();
    filter.email = query["email"];
    filter.first_name = query["first_name"];
    filter.last_name = query["last_name"];
    filter.phone_number = query["phone_number"];
    filter.id = query["id"];
    return filter;
  }
}

const getCustomerList = async (paginate, filterCustomer) => {
  var withFilter;
  if (filterCustomer.email) {
    withFilter = {
      email: {
        [Op.like]: `%${filterCustomer.email}%`,
      },
    };
  } else if (filterCustomer.first_name) {
    withFilter = {
      first_name: {
        [Op.like]: `%${filterCustomer.first_name}%`,
      },
    };
  } else if (filterCustomer.last_name) {
    withFilter = {
      last_name: {
        [Op.like]: `%${filterCustomer.last_name}%`,
      },
    };
  } else if (filterCustomer.phone_number) {
    withFilter = {
      phone_number: {
        [Op.like]: `%${filterCustomer.phone_number}%`,
      },
    };
  } else if (filterCustomer.id) {
    withFilter = {
      id: {
        [Op.like]: `%${filterCustomer.id}%`,
      },
    };
  }
  const totalResult = await db.User.count({
    where: {
      status: {
        [Op.eq]: "user",
      },
    },
  });
  if (withFilter == undefined) {
    const result = await db.User.findAll({
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
    const result = await db.User.findAll({
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

exports.getCustomerAll = async (req, res, next) => {
  try {
    const countCustomer = await db.User.count({
      where: {
        status: {
          [Op.eq]: "user",
        },
      },
    });
    if (countCustomer === 0) {
      res.status(400).json({
        message: "No Customer",
      });
    }
    const offset = Number(req.query["offset"]);
    const limit = Number(req.query["limit"]);
    const paginate = {
      offset: isNaN(offset) ? 0 : offset,
      limit: isNaN(limit) ? 10 : limit,
    };
    const data = await getCustomerList(
      paginate,
      FilterCustomer.fromQuery(req.query)
    );
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const dataCustomer = await db.User.findOne({
      where: {
        id: {
          [Op.eq]: customerId,
        },
      },
    });

    if (!dataCustomer) {
      return res.status(400).json({ message: "this customer not found" });
    }
    res.status(200).json({ data: dataCustomer });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const dataCustomer = await db.User.findOne({
      where: {
        id: {
          [Op.eq]: customerId,
        },
      },
    });

    if (!dataCustomer) {
      return res.status(400).json({ message: "this customer not found" });
    }

    if (req.query["email"]) {
      dataCustomer.email = req.query["email"];
    }
    if (req.query["first_name"]) {
      dataCustomer.first_name = req.query["first_name"];
    }
    if (req.query["last_name"]) {
      dataCustomer.last_name = req.query["last_name"];
    }
    if (req.query["phone_number"]) {
      dataCustomer.phone_number = req.query["phone_number"];
    }
    if (req.query["status"]) {
      dataCustomer.status = req.query["status"];
    }

    await dataCustomer.save();
    res.status(200).json({ message: "customer was updated." });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const dataCustomer = await db.User.findOne({
      where: {
        id: {
          [Op.eq]: customerId,
        },
      },
    });

    if (!dataCustomer) {
      return res.status(400).json({ message: "this customer not found" });
    }

    await dataCustomer.destroy();
    res.status(204).json({ message: "this customer was deleted" });
  } catch (err) {
    next(err);
  }
};
