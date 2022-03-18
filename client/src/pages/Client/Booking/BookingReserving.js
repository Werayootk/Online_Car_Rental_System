import React, { useState } from "react";
import "./BookingReserving.scss";
import { Radio, Button, Form, Input, notification } from "antd";
import {
  BankOutlined,
  CreditCardOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../../storage/reducers/bookingSlice";
import searchCarServices from "../../../services/searchCarServices";
import paymentService from "../../../services/paymentServices";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import localStorageServices from "../../../services/localStorageUserServices";
import Script from "react-load-script";
import { useHistory, useLocation } from 'react-router-dom';

let OmiseCard;
const { Item } = Form;
const { getUserInfo } = localStorageServices;

const BookingReserving = () => {
  const [userInfo, setuserInfo] = useState(getUserInfo());
  const bookingItems = useSelector((state) => state.booking.bookingList);
  const bookingItem = bookingItems[bookingItems.length - 1];
  const [selectPayment, setSelectPayment] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState();
  const [resOmise, setResOmise] = useState();
  const [resBooking, setResBooking] = useState();
  const history = useHistory();

  const onChangePayment = (e) => {
    setSelectPayment(e.target.value); //1 credit, 2 internet-bank
  };

  const createOrderAndBill = async (status) => {
   /**
     * 1. Check status resOmise if success => create Order and Bill with status "ชำระเงินแล้ว" => redirect to verify
     * 2. else => create Order and Bill with status "รอชำระเงิน" => redirect to verify
    */
    if (status === "successful") {
      const data_success = {
        car: bookingItem.carId,
        location: bookingItem.location,
        pickup_datetime: bookingItem.pickup_date,
        return_datetime: bookingItem.return_date,
        price_per_day: bookingItem.car_price,
        total_price: bookingItem.total_price,
        payment_status:"ชำระเงินแล้ว"
      };
      await searchCarServices.createCarOrder(data_success).then(res => {
        setResBooking(res.data);
        const params = `?booking_no=${resBooking.booking_no}&booking_status=${resBooking.booking_status}&bill_status=${resBooking.bill_status}`;
        history.push(`/search-car-verify${params}`);
        notification.success({
          message: res.data.message,
        });
      }).catch(err => {
        console.error(err);
      });

    } else {
      const data_unsuccess = {
        car: bookingItem.carId,
        location: bookingItem.location,
        pickup_datetime: bookingItem.pickup_date,
        return_datetime: bookingItem.return_date,
        price_per_day: bookingItem.car_price,
        total_price: bookingItem.total_price,
        payment_status:"รอชำระเงิน"
      };
      await searchCarServices.createCarOrder(data_unsuccess).then(res => {
        setResBooking(res.data);
        const params = `?booking_no=${resBooking.booking_no}&booking_status=${resBooking.booking_status}&bill_status=${resBooking.bill_status}`;
        history.push(`/search-car-verify${params}`);
        notification.success({
          message: res.data.message,
        });
      }).catch(err => {
        console.error(err);
      });
    } 
  }

  const onSubmitBooking = async (values) => {
    console.log(values);
    setFormData(values);
    if (selectPayment === 1) {
      creditCardConfigure();
      await omiseCardHandler();
    } else {
      internetBankingConfigure();
      await omiseInternetBankingHandler();
    }
    const createBooking = await createOrderAndBill(resOmise.status);
    console.log(createBooking);
  };

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.publicKey,
      currency: "THB",
      frameLabel: "Car easy life",
      submitLabel: "ชำระเงิน",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: bookingItem.total_price,
      onCreateTokenSuccess: async (token) => {
        const data = {
          email: formData.email,
          name: formData.first_name,
          amount: bookingItem.total_price,
          token: token,
        };
        await paymentService
          .omiseCheckoutCreditCard(data)
          .then((res) => {
            console.log(res.data);
            setResOmise(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      },
      onFormClosed: () => {
        console.log("close omise form credit-card");
        // window.location.reload(true);
      },
    });
  };

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  }

  const omiseInternetBankingHandler = () => {
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      onCreateTokenSuccess: async (token) => {
        const data = {
          email: formData.email,
          name: formData.first_name,
          amount: bookingItem.total_price,
          token: token,
        };
        await paymentService
          .omiseCheckoutInternetBanking(data)
          .then((res) => {
            console.log(res.data);
            setResOmise(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      },
      onFormClosed: () => {
        console.log("close omise form internet-banking");
        // window.location.reload(true);
      },
    });
  };

  return (
    <div className="center-form-Book">
      <div className="contact_form_wrapper">
        <p className="form_title">รายละเอียดของผู้ขับรถ</p>
        <Form name="submitBooking" onFinish={onSubmitBooking}>
          <div className="form-group">
            <Item
              name="first_name"
              label="ชื่อจริง"
              rules={[
                {
                  required: true,
                  message: "Please input your First-Name!",
                },
              ]}
            >
              <Input
                placeholder={userInfo.first_name || "ชื่อ"}
                value={userInfo.first_name}
              />
            </Item>
          </div>
          <div className="form-group">
            <Item
              name="last_name"
              label="นามสกุล"
              rules={[
                {
                  required: true,
                  message: "Please input your Last-Name!",
                },
              ]}
            >
              <Input
                placeholder={userInfo.last_name || "นามสกุล"}
                value={userInfo.last_name}
              />
            </Item>
          </div>
          <div className="form-group">
            <Item
              name="email"
              label="อีเมล"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                placeholder={userInfo.email || "E-mail"}
                value={userInfo.email}
              />
            </Item>
          </div>
          <div className="form-group">
            <Item
              name="phone_number"
              label="หมายเลขโทรศัพทฺ์"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  min: 10,
                  message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={
                  userInfo.phone_number ||
                  "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก"
                }
                value={userInfo.phone_number}
              />
            </Item>
          </div>
          <div className="radio-form">
            <Item
              name="radio-group"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกวิธีชำระเงิน",
                },
              ]}
            >
              <Radio.Group onChange={onChangePayment} value={selectPayment}>
                <Radio value={1}>
                  <CreditCardOutlined style={{ fontSize: "150%" }} />{" "}
                  ชำระผ่านบัตรเครดิต
                </Radio>
                <Radio value={2}>
                  <BankOutlined style={{ fontSize: "150%" }} />{" "}
                  ชำระโอนผ่านธนาคาร
                </Radio>
              </Radio.Group>
            </Item>
          </div>
          <div className="submit_button_wrapper_reserve">
            <div className="button_box_reserve">
              <Item>
                <Script
                  url="https://cdn.omise.co/omise.js"
                  onLoad={handleLoadScript}
                />
                <Link to="/search-car-verify">
                  <Button type="primary" htmlType="submit" size={700}>
                    ทำการจองรถ
                  </Button>
                </Link>
              </Item>
              <Link to="/search-car-book">
                <Button size={500}>ย้อนกลับ</Button>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookingReserving;
