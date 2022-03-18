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

/** TODO 11
 * 1. axios booking no
 * 2. axios cancel
 * 3. add Omise re payment condition
 * 
 */
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
          <div className="gallery_wrapper_verify pb-2">
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
                <Gear fontSize={"14px"} /> ออโต้{" "}
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
        <div className="rentaldetail">
          <div className="padding__inner">
            <h3>ข้อมูลการเช่ารถ</h3>
            <h4>สถานที่รับรถ/คืนรถ</h4>
            <p className="border__bottom">แยกติวานนท์ (นนทบุรี)</p>
            <div className="pickup__return border__bottom">
              <div>
                <h4>วันที่รับรถ</h4>
                <p>25 ธ.ค. 2021</p>
                <p>20:00 น.</p>
              </div>
              <div className="border__left">
                <h4>วันที่คืนรถ</h4>
                <p>27 ธ.ค. 2021</p>
                <p>20:00 น.</p>
              </div>
            </div>
            <div>
              <h4>ค่าเช่า</h4>
              <div className="pair__full">
                <p>ค่าเช่าสำหรับ 2 วัน</p>
                <p>฿2,800</p>
              </div>
              <div className="pair__full">
                <p>ค่าบริการรับ-ส่งรถ</p>
                <p>฿600</p>
              </div>
            </div>
          </div>
          <div className="pair__full pair__full--total mb0">
            <div>
              <p>ราคารวม</p>
            </div>
            <p className="total">฿3,400</p>
          </div>
          <div class="padding__inner">
            <div class="pair__full center">
              <span style={{cursor:"pointer"}}>
                <small
                  style={{ fontSize: "14px", textDecoration:"underline",color:"red"}}
                >
                  ยกเลิกการจอง
                </small>
              </span>
              <span style={{cursor:"pointer"}}>
                <small
                  style={{ fontSize: "14px", textDecoration:"underline",color:"red"}}
                >
                  ดำเนินการชำระเงิน
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingVerify;
