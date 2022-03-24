import React, { useState } from "react";
import "./BookingReserving.scss";
import { Radio, Button, Form, Input, notification, Spin } from "antd";
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
import { HashRouter as Router, Link, NavLink, Redirect } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [resOmise, setResOmise] = useState();
  const [resBooking, setResBooking] = useState();
  const history = useHistory();

  const onChangePayment = (e) => {
    setSelectPayment(e.target.value); //1 credit, 2 internet-bank
  };

  const onSubmitBooking = async (values) => {
    console.log('on submit');
    console.log(values);
    if (selectPayment === 1) {
      await creditCardConfigure();
      await omiseCardHandler(values);
    } else {
      await internetBankingConfigure();
      await omiseInternetBankingHandler(values);
    }
  };

  const handleLoadScript = () => {
    console.log('handleLoadScript');
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.publicKey || "pkey_test_5r20sb3568n09tz0gj6",
      currency: "thb",
      frameLabel: "Car easy life",
      submitLabel: "ชำระเงิน",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    console.log('credit-crad-config');
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = (values) => {
    const amount = Number(bookingItem.total_price)*100;
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: async (token) => {
        console.log(token);
        const data = {
          email: values.email,
          name: values.first_name,
          amount: amount,
          token: token,
        };
        await paymentService
          .omiseCheckoutCreditCard(data)
          .then((res) => {
            console.log(res.data);
            setResOmise(res.data);
            const {status} = res.data
            return { data: status };
          }).then((res) => {
            console.log("data should be status: " + res.data);
            const status = res.data
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
              setLoading(true);
              setTimeout(() => {
                searchCarServices.createCarOrder(data_success).then(res => {
                  setResBooking(res.data);
                  const { booking_no, booking_status, bill_status } = res.data
                  const params = `?booking_no=${booking_no}&booking_status=${booking_status}&bill_status=${bill_status}`;
                  notification.success({
                    message: res.data.message,
                  });
                  history.push(`/search-car-verify${params}`);
                })
              }, 3000);
              setLoading(false);
            } else {
              notification.error({
                message: "ชำระเงินไม่สำเร็จกรุณาลองใหม่อีกครั้ง",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
      onFormClosed: () => {
        console.log("close omise form credit-card");
        //window.location.reload(true);
      },
    });
  };

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking_scb",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  }

  const omiseInternetBankingHandler = (values) => {
    console.log('internet banking');
    const amount = Number(bookingItem.total_price) * 100;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      onCreateTokenSuccess: async (token) => {
        console.log(token);
        const data = {
          email: values.email,
          name: values.first_name,
          amount: amount,
          token: token,
        };
        await paymentService
          .omiseCheckoutInternetBanking(data)
          .then((res) => {
            console.log(res.data);
            setResOmise(res.data);
            const { authorizeUri } = res.data;
            if (authorizeUri) {
              window.location.href = authorizeUri;
            }
            //To D0 WebHooks get status store DB
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
      {loading ? (
        <div className="car_spin">
          <Spin size="large" />
        </div>
      ) : (
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
                  placeholder={"ชื่อ"}
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
                  placeholder={"นามสกุล"}
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
                  placeholder={"E-mail"}
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
                    "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก"
                  }
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
                  <Button type="primary" htmlType="submit" size={700} id={selectPayment === 1 ? "credit-card" : "internet-banking"}>
                    ทำการจองรถ
                  </Button>
                </Item>
                <Link to="/search-car-book">
                  <Button size={500}>ย้อนกลับ</Button>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BookingReserving;
