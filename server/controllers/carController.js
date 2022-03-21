const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const util = require("util");
const db = require("../models");
const cloudinary = require("../utils/cloudinary");

const uploadPromise = util.promisify(cloudinary.uploader.upload);

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        res: res.secure_url,
      });
    });
  });
};


class FilterCar {
  id;
  car_brand;
  car_register;
  car_type;
  car_transmission;
  car_seat;
  car_status;
  car_price;
  static fromQuery(query) {
    const _filterCar = new FilterCar();
    _filterCar.id = query["id"];
    _filterCar.car_brand = query["car_brand"];
    _filterCar.car_register = query["car_register"];
    _filterCar.car_type = query["car_type"];
    _filterCar.car_transmission = query["car_transmission"];
    _filterCar.car_seat = query["car_seat"];
    _filterCar.car_status = query["car_status"];
    _filterCar.car_price = query["car_price"];
    return _filterCar;
  }
}

const getCarList = async (paginate, filterCar) => {
  var withFilter;
  if (filterCar.car_brand) {
    withFilter = {
      car_brand: {
        [Op.like]: `%${filterCar.car_brand}%`,
      },
    };
  } else if (filterCar.car_register) {
    withFilter = {
      car_register: {
        [Op.like]: `%${filterCar.car_register}%`,
      },
    };
  } else if (filterCar.car_type) {
    withFilter = {
      car_type: {
        [Op.like]: `%${filterCar.car_type}%`,
      },
    };
  } else if (filterCar.car_transmission) {
    withFilter = {
      car_transmission: {
        [Op.like]: `%${filterCar.car_transmission}%`,
      },
    };
  } else if (filterCar.car_seat) {
    withFilter = {
      car_seat: {
        [Op.like]: `%${filterCar.car_seat}%`,
      },
    };
  } else if (filterCar.car_status) {
    withFilter = {
      car_status: {
        [Op.like]: `%${filterCar.car_status}%`,
      },
    };
  } else if (filterCar.car_price) {
    withFilter = {
      car_price: {
        [Op.like]: `%${filterCar.car_price}%`,
      },
    };
  } else if (filterCar.id) {
    withFilter = {
      id: {
        [Op.like]: `%${filterCar.id}%`,
      },
    };
  }

  const totalResult = await db.Car.count();
  if (withFilter == undefined) {
    const result = await db.Car.findAll({
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
    const result = await db.Car.findAll({
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

exports.getCarAll = async (req, res, next) => {
  try {
    const countCar = await db.Car.count();
    if (countCar === 0) {
      res.status(400).json({
        message: "No Car",
      });
    }
    const offset = Number(req.query["offset"]);
    const limit = Number(req.query["limit"]);
    const paginate = {
      offset: isNaN(offset) ? 0 : offset,
      limit: isNaN(limit) ? 10 : limit,
    };
    const data = await getCarList(paginate, FilterCar.fromQuery(req.query));
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const dataCar = await db.Car.findOne({
      where: {
        id: {
          [Op.eq]: carId,
        },
      },
    });

    if (!dataCar) {
      return res.status(400).json({
        message: "this car not found",
      });
    }
    res.status(200).json({ data: dataCar });
  } catch (err) {
    next(err);
  }
};

exports.updateCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const { car_brand,
      car_register,
      car_type,
      car_transmission,
      car_seat,
      car_status,
      car_price } = req.body;
    const dataCar = await db.Car.findOne({
      where: {
        id: {
          [Op.eq]: carId,
        },
      },
    });
    if (!dataCar) {
      return res.status(400).json({
        message: "ไม่สามารถอัพเดตข้อมูลรถได้",
      });
    }

    await dataCar.update({
      car_brand: car_brand,
      car_register: car_register,
      car_type: car_type,
      car_transmission: car_transmission,
      car_seat: car_seat,
      car_status: car_status,
      car_price: car_price,
    });
    // if (req.query["car_brand"]) {
    //   dataCar.car_brand = req.query["car_brand"];
    // }
    // if (req.query["car_register"]) {
    //   dataCar.car_register = req.query["car_register"];
    // }
    // if (req.query["car_type"]) {
    //   dataCar.car_type = req.query["car_type"];
    // }
    // if (req.query["car_transmission"]) {
    //   dataCar.car_transmission = req.query["car_transmission"];
    // }
    // if (req.query["car_seat"]) {
    //   dataCar.car_seat = req.query["car_seat"];
    // }
    // if (req.query["car_status"]) {
    //   dataCar.car_status = req.query["car_status"];
    // }
    // if (req.query["car_price"]) {
    //   dataCar.car_price = req.query["car_price"];
    // }
    // await dataCar.save();
    res.status(200).json({ message: "ข้อมูลรถอัพเดตเรียบร้อยแล้ว" });
  } catch (err) {
    next(err);
  }
};

exports.addCar = async (req, res, next) => {
  try {
    const {
      car_brand,
      car_register,
      car_type,
      car_transmission,
      car_seat,
      car_price,
    } = req.body;
    
    const carPrice = parseInt(car_price);

    const existCar = await db.Car.findOne({
      where: {
        car_brand: {
          [Op.eq]: car_brand,
        }
      }
    });

    if (existCar) {
      return res.status(400).json({
        message: "มีรถนี้อยู่ในระบบอยู่แล้ว"
      })
    }

    const newCar = await db.Car.create({
      car_brand,
      car_register,
      car_type,
      car_transmission,
      car_seat,
      car_status: "available",
      car_price: carPrice,
    });

    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryImageUploadMethod(path);
      console.log(newPath);
      urls.push(newPath);
    }

    for (const url of urls) {
      const urlString = String(url.res);
      console.log(urlString);
      const newImgCar = await db.Image_car.create({
        car_id: newCar.id,
        img_url: urlString
      });
    }

    res.status(201).json({ message: "เพิ่มรถใหม่เข้าระบบเรียบร้อบแล้ว" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const dataCar = await db.Car.findOne({
      where: {
        id: {
          [Op.eq]: carId,
        }
      },
    });

    if (!dataCar) {
      return res.status(400).json({ message: "this car not found" });
    }

    await db.Image_car.destroy({
      where: {
        car_id: dataCar.id
      }
    });

    await dataCar.destroy();
    res.status(204).json({ message: "this car was deleted" });
  } catch (err) {
    next(err);
  }
};
