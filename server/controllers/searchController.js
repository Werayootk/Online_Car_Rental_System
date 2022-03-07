const { Op } = require("sequelize");
const db = require("../models");

const getCarListFilterAndSort = async (paginate, filterCarList, sortPrice) => {
  const withFilterCarList = filterCarList.map(elem => {
    return {
      [Op.eq]: elem
    }
  });

  if (filterCarList.length == 0) {
    const countCarAvailable = await db.Car.count({
      where: {
        [Op.eq]: {
          car_status: "Available",
        },
      },
    });
    const carAvailable = await db.Car.findAll({
      where: {
        [Op.eq]: {
          car_status: "Available",
        },
        order: [["car_price", sortPrice]],
      },
    });
    return {
      data: carAvailable,
      total: countCarAvailable,
      offset: paginate.offset,
      limit: paginate.limit,
    };
  } else {
    const countCarAvailableWithFilter = await db.Car.count({
      where: {
        [Op.and]: {
          [Op.eq]: { car_status: "Available" },
          [Op.or]: [withFilterCarList]
        }
      },
    });
    const carAvailableWithFilter = await db.Car.findAll({
      where: {
        [Op.and]: {
          [Op.eq]: { car_status: "Available" },
          [Op.or]: [withFilterCarList]
        },
        order: [["car_price", sortPrice]],
      },
    });
    return {
      data: carAvailableWithFilter,
      total: countCarAvailableWithFilter,
      offset: paginate.offset,
      limit: paginate.limit,
    };
  }
};

exports.getCarListAll = async (req, res, next) => {
  try {
    /**
     * 1. Query data from Car By status available with limit offset count
     * 2. Query with filter Car type By ?car_type with limit offset count
     * 3. Query data with order asc or desc car_price
     * 4. return data
     */
    const { car_type, sort_price } = req.params;
    const offset = Number(req.query["offset"]);
    const limit = Number(req.query["limit"]);
    const paginate = {
      offset: isNaN(offset) ? 0 : offset,
      limit: isNaN(limit) ? 4 : limit,
    };
    const countCarAvailable = await db.Car.count({
      where: {
        [Op.eq]: {
          car_status: "Available",
        },
      },
    });

    if (countCarAvailable == 0) {
      return res.status(400).json({
        message: "Not found car available",
      });
    };
    
    car_type_filter = car_type ? car_type.split(",") : [];
    const data = await getCarListFilterAndSort(
      paginate,
      car_type_filter,
      sort_price
    );
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCarDetailById = async (req, res, next) => {
  try {
    /**
     * 1. Query data from carId
     * 2. return data
     */
    const { carId } = req.params;
    const data = await db.Car.findOne({
      where: {
        [Op.eq]: carId
      }
    });
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.createCarOrder = async (req, res, next) => {
  try {
    /**
     * 1. create data from ?car_id=&location=&user_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00&price_per_day&total_price
     * 2. create to order and bill
     * 3. update data car_status
     */
    const {
      carId,
      locationId,
      userId,
      pickup_datetime,
      return_datetime,
      price_per_day,
      total_price
    } = req.params;

    const pickupDateTime = Date(pickup_datetime);
    const returnDateTime = Date(return_datetime);

    if (carId || locationId || userId) {
      return res.status(400).json({
        message: 'Cannot create this booking'
      })
    }
    const time_Stamps = String(Date.now());
    const createBookingNumber = `${userId}${carId}${locationId}${time_Stamps}`;
    const pricePerDay = Number(price_per_day);
    const totalPrice = Number(total_price);

    const newOrder = await db.Order.create({
      user_id: userId,
      car_id: carId,
      booking_no: createBookingNumber,
      refund: '',
      booking_status: 'pending_payment',
      pickup_location: location,
      return_location: location,
      start_datetime: pickupDateTime,
      end_datetime: returnDateTime
    });
    await newOrder.save();

    const newBill = await db.Billing.create({
      user_id: userId,
      order_id: newOrder.id,
      bill_date: Date.now(),
      bill_status: 'pending_payment',
      amount: pricePerDay,
      total_amount: totalPrice
    });
    await newBill.save();

    return res.status(201).json({
      message: 'Order and Bill is created.'
    });
  } catch (err) {
    next(err);
  }
};

exports.getProvinceAndLocation = async (req, res, next) => {
  try {
    const dataLocation = await db.Location.findAll();

    if (dataLocation == undefined) {
      return res.status(400).json({
        message: 'No Location'
      });
    }

    return res.status(200).json({
      data: dataLocation
    })
  } catch (err) {
    next(err);
  }
}
