import React, { useState } from "react";
import "./BookingReserving.scss";
import { Radio } from "antd";
import {
  BankOutlined,
  CreditCardOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";

const BookingReserving = () => {
  const [value, setValue] = useState(1);
  const onChangePayment = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="center-form-Book">
      <div className="contact_form_wrapper">
        <p className="form_title">รายละเอียดของผู้ขับรถ</p>
        <form className="booking_customer">
          <div className="form-group">
            <input
              placeholder="ชื่อ"
              name="first_name"
              type="text"
              className="form-control"
              value=""
            />
          </div>
          <div className="form-group">
            <input
              placeholder="นามสกุล"
              name="last_name"
              type="text"
              className="form-control"
              value=""
            />
          </div>
          <div className="form-group">
            <MailOutlined className="mail-icon" />
            <input
              placeholder="    อีเมลสำหรับยืนยันการจอง"
              name="email"
              type="email"
              className="form-control"
              value=""
            />
          </div>
          <div className="form-group">
            <MobileOutlined className="mobile-icon" />
            <input
              placeholder="   กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก"
              name="phone_number"
              type="tel"
              className="form-control"
              value=""
            />
          </div>
        </form>
      </div>
      <div className="radio-form">
        <Radio.Group onChange={onChangePayment} value={value}>
          <Radio value={1}>
            <CreditCardOutlined style={{ fontSize: "150%" }} />{" "}
            ชำระผ่านบัตรเครดิต
          </Radio>
          <Radio value={2}>
            <BankOutlined style={{ fontSize: "150%" }} /> ชำระโอนผ่านธนาคาร
          </Radio>
        </Radio.Group>
      </div>
      <div className="submit_button_wrapper_reserve"> 
        <div className="button_box_reserve">
        <button className="btn btn-secondary">ย้อนกลับ</button>
        <button className="btn btn-primary_reserve">ทำการจองรถ</button>
        </div>
      </div>
    </div>
  );
};

export default BookingReserving;
