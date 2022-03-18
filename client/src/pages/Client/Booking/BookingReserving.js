import React, { useState } from "react";
import "./BookingReserving.scss";
import { Radio, Button, Form, Input } from "antd";
import {
  BankOutlined,
  CreditCardOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../../storage/reducers/bookingSlice";
import searchCarServices from "../../../services/searchCarServices";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import localStorageServices from "../../../services/localStorageUserServices";

const { Item } = Form;
const { getUserInfo } = localStorageServices;
/* TODO 10
  3. Add Omise payment client and server 
  5. redirect to finish page success (create page)step by booking NO
*/

const BookingReserving = () => {
  const [userInfo, setuserInfo] = useState(getUserInfo());
  const bookingItems = useSelector((state) => state.booking.bookingList);
  const bookingItem = bookingItems[bookingItems.length - 1];
  const [selectPayment, setSelectPayment] = useState(1);
  const [loading, setLoading] = useState(true);

  const onChangePayment = (e) => {
    console.log("radio checked", e.target.value);
    setSelectPayment(e.target.value); //1 credit, 2 internet bank
  };

  const onSubmitBooking = (values) => {
    console.log(values);
    //1. send to axios create order and bill 
    //2. Redirect to payment page omise
    //3. if no payment redirect to booking verify with message create order with status รอชำระ 
    //4. if yes update status on db before redirect to message peyment success
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
              <Input placeholder={userInfo.first_name || "ชื่อ"} value={userInfo.first_name} />
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
              <Input placeholder={userInfo.last_name || "นามสกุล"} value={userInfo.last_name} />
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
              <Input placeholder={userInfo.email || "E-mail"} value={userInfo.email}/>
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
              <Input placeholder={userInfo.phone_number || "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก"}  value={userInfo.phone_number} />
            </Item>
          </div>
          <div className="radio-form">
            <Item name="radio-group"
                 rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกวิธีชำระเงิน',
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
              <Link to="/search-car-verify">
                <Button type="primary" htmlType="submit" size={700}>
                  ทำการจองรถ
                </Button>
              </Link>
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
