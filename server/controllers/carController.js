const { Op } = require("sequelize");
const db = require("../models");
const cloudinary = require("../utils/cloudinary");

const cloudinaryImageUploadMethod = async file => {
  return new Promise(resolve => {
      cloudinary.uploader.upload( file , (err, res) => {
        if (err) return res.status(500).send("upload image error")
          resolve({
            res: res.secure_url
          }) 
        }
      ) 
  })
}
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
          message: "No Car"
        });
      }
      const offset = Number(req.query["offset"]);
      const limit = Number(req.query["limit"]);
      const paginate = {
        offset: isNaN(offset) ? 0 : offset,
        limit: isNaN(limit) ? 10 : limit,
      };
      const data = await getCarList(
        paginate,
        FilterCar.fromQuery(req.query)
      );
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
          message: "this car not found"
        })
      }
    res.status(200).json({ data: dataCar });

    } catch (err) {
      next(err);
    }
};

exports.updateCarById = async (req, res, next) => {
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
          message: "this car not found"
        })
      }

      if (req.query["id"]) {
        dataCar.id = req.query["id"];
      }
      if (req.query["car_brand"]) {
        dataCar.car_brand = req.query["car_brand"];
      }
      if (req.query["car_register"]) {
        dataCar.car_register = req.query["car_register"];
      }
      if (req.query["car_type"]) {
        dataCar.car_type = req.query["car_type"];
      }
      if (req.query["car_transmission"]) {
        dataCar.car_transmission = req.query["car_transmission"];
      }
      if (req.query["car_seat"]) {
        dataCar.car_seat = req.query["car_seat"];
      }
      if (req.query["car_status"]) {
        dataCar.car_status = req.query["car_status"];
      }
      if (req.query["car_price"]) {
        dataCar.car_price = req.query["car_price"];
      }
    await dataCar.save();
    res.status(200).json({ message: "Car was updated." });
    } catch (err) {
      next(err);
    }
};

exports.addCar = async (req, res, next) => {
    try {
      
    // const urls = [];
    // const files = req.files;
    // for (const file of files) {
    //   const { path } = file;
    //   const newPath = await cloudinaryImageUploadMethod(path);
    //   urls.push(newPath);
    // }
    
    // const product = new Product({ 
    //   name: req.body.name,
    //   productImages: urls.map( url => url.res ),
    // });
    
    
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
          },
        },
      });
  
      if (!dataCar) {
        return res.status(400).json({ message: "this car not found" });
      }
  
      await dataCar.destroy();
      res.status(204).json({ message: "this car was deleted" });
    } catch (err) {
      next(err);
    }
};