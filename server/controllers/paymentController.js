const { Op } = require("sequelize");
const db = require("../models");
const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
})

 exports.updateBillStatusByUser = async (req, res, next) => {
    try {
      const { booking_no } = req.params;
      const { booking_status, bill_status } = req.query;
      const getBooking = await db.Order.findOne({
        where: {
          booking_no: booking_no,
          user_id: req.user.id
        }
      });

      if (!getBooking) {
        return res.status(400).json({
          message: 'Not found booking number.'
        })  
      };

      const getBill = await db.Billing.findOne({
        where: {
            order_id: getBooking.id
        }
      });

      getBill.bill_status = bill_status;
      getBooking.booking_status = booking_status;
      await getBill.save();
      await getBooking.save();
      
      res.status(200).json({
        message: 'Order and Bill is updated.'
      })
    } catch (err) {
      next(err);
    }
};

exports.omiseCheckoutCreditCard = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token
    });

    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id
    });

    res.status(200).json({
      authorizeUri: charge.authorize_uri,
      amount: charge.amount,
      status: charge.status, //successful failed
      message: "ชำระเงินเรียบร้อย"
    });

  } catch (err) {
    next(err);
  }
};

exports.omiseCheckoutInternetBanking = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;
    
    const charge = await omise.charges.create({
      amount,
      source: token,
      currency: "thb",
    });

    res.status(200).json({
      authorizeUri: charge.authorize_uri,
      amount: charge.amount,
      status: charge.status, //successful failed
      message: "ชำระเงินเรียบร้อย"
    })

  } catch (err) {
    next(err);
  }
};