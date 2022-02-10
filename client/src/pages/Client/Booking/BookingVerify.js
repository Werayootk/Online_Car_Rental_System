import React, { useState } from "react";
import "./BookingVerify.scss";
import StepProgressVerify from "../../../components/StepProgressVerify/StepProgressVerify";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TrademarkCircleOutlined,
  CarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ReactComponent as Gear } from "../../../assets/images/gear.svg";
import ImageGallery from "react-image-gallery";

import { imagesTest, carData } from "../../../mockup/car_data";

const BookingVerify = (props) => {
  const [imgcar, setImgcar] = useState(imagesTest);

  return (
    <div className="container merged_container">
      <div className="left_container_verify">
        <div className="booking-status">
          <div className="status-header">
            <div>
              <small>หมายเลขการจอง</small>
              <p>637467</p>
              <small>สถานะการจอง</small>
            </div>
          </div>
          <StepProgressVerify />
        </div>
        <div className="customer-detail">
          <p>ข้อมูลผู้เช่ารถ</p>
          <div className="detail-items">
            <div className="item">
              <UserOutlined /> <span>วีรยุทธ กันภัย</span>
            </div>
            <div className="item">
              <PhoneOutlined /> <span>+66947978993</span>
            </div>
            <div className="item">
              <MailOutlined /> <span>werayoot5800@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right_container_verify">
        <div className="cardetail">
          <h3>ข้อมูลรถเช่า</h3>
          <div className="gallery_wrapper pb-2">
            <div className="gallery">
              <ImageGallery items={imagesTest} />
            </div>
            <p className="title">Suzuki Swift 2015</p>
            <h4>ข้อมูลรถ</h4>
            <div className="detail">
              <div className="pair">
                <CarOutlined /> รถกระบะ{" "}
              </div>
              <div className="pair">
                <Gear fontSize={'14px'} /> ออโต้{" "}
              </div>
              <div className="pair">
                <TeamOutlined /> 4 ที่นั่ง
              </div>
              <div className="pair">
                <TrademarkCircleOutlined /> จดทะเบียน 2016{" "}
              </div>
            </div>
          </div>
        </div>
        <p>Car Detail</p>
        <p>Rental Detail</p>
        <p>Price Detail</p>
        <p>Cancel Button</p>
      </div>
    </div>
  );
};

export default BookingVerify;
