const { Op } = require("sequelize");
const db = require("../models");
class FilterLocation {
  province;
  location;
  id;
  static fromQuery(query) {
    const _filterLocation = new FilterLocation();
    _filterLocation.province = query["province"];
    _filterLocation.location = query["location"];
    _filterLocation.id = query["id"];
    return _filterLocation;
  }
}

const getLocationList = async (paginate, filterLocation) => {
  var withFilter;
  if (filterLocation.province) {
    withFilter = {
      province: {
        [Op.like]: `%${filterLocation.province}%`,
      },
    };
  } else if (filterLocation.location) {
    withFilter = {
      location: {
        [Op.like]: `%${filterLocation.location}%`,
      },
    };
  } else if (filterLocation.id) {
    withFilter = {
      id: {
        [Op.like]: `%${filterLocation.id}%`,
      },
    };
  }
      const totalResult = await db.Location.count();
  
      if (withFilter == undefined) {
        console.log("location filter none.");
        const result = await db.Location.findAll({
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
        console.log("location with filter.");
        const result = await db.Location.findAll({
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

exports.getLocationAll = async (req, res, next) => {
  try {
    const offset = Number(req.query["offset"]);
    const limit = Number(req.query["limit"]);
    const paginate = {
      offset: isNaN(offset) ? 0 : offset,
      limit: isNaN(limit) ? 10 : limit,
    };
    const data = await getLocationList(
      paginate,
      FilterLocation.fromQuery(req.query)
    );
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getLocationById = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    const dataLocation = await db.Location.findOne({
      where: {
        id: {
          [Op.eq]: locationId,
        },
      },
    });

    if (!dataLocation) {
      return res.status(400).json({ message: "this location not found" });
    }
    res.status(200).json({ data: dataLocation });
  } catch (err) {
    next(err);
  }
};

exports.addLocation = async (req, res, next) => {
  try {
    const { province, location } = req.body;
    const existLocation = await db.Location.findOne({
      where: {
        location: {
          [Op.eq]: location,
        },
      },
    });

    if (existLocation) {
      return res
        .status(400)
        .json({ message: "this location is already exist" });
    }

    await db.Location.create({
      province,
      location,
    });

    res.status(201).json({ message: "location created" });
  } catch (err) {
    next(err);
  }
};

exports.updateLocationById = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    const dataLocation = await db.Location.findOne({
      where: {
        id: {
          [Op.eq]: locationId,
        },
      },
    });

    if (!dataLocation) {
      return res.status(400).json({ message: "this customer not found" });
    }

    if (req.query["province"]) {
      dataLocation.province = req.query["province"];
    }
    if (req.query["location"]) {
      dataLocation.location = req.query["location"];
    }

    await dataLocation.save();
    res.status(200).json({ message: "location was updated." });
  } catch (err) {
    next(err);
  }
};

exports.deleteLocationById = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    const dataLocation = await db.Location.findOne({
      where: {
        id: {
          [Op.eq]: locationId,
        },
      },
    });

    if (!dataLocation) {
      return res.status(400).json({ message: "this location not found" });
    }

    await dataLocation.destroy();
    res.status(204).json({ message: "this location was deleted" });
  } catch (err) {
    next(err);
  }
};
