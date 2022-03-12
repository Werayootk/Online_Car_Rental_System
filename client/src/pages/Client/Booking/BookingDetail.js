import React, { useState, useEffect } from "react";
import "./BookingDetail.scss";
import ImageGallery from "react-image-gallery";
import { DatePicker, Space } from "antd";
import TableCarDetail from "../../../components/TableCarDetail/TableCarDetail";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';

import { imagesTest, carData } from "../../../mockup/car_data";
/**TODO 9
 * 1. axios data car
 * 2. get state location pickup return date from context
 * 3. cal date cal price save content
 * 4. select this car redirect
 */

const BookingDetail = (props) => {
  const [imgcar, setImgcar] = useState(imagesTest);
  const [carDetail, setCarDetail] = useState(carData[0]);
  const { RangePicker } = DatePicker;

  return (
    <div className="container merged_container">
      <div className="mt-3 left_container">
        <div className="header_container">
          <div className="header_left">
            <h3>Suzuki Swift 2015</h3>
            <div className="branch_content"></div>
          </div>
          <div className="header_right"></div>
          <div className="gallery_wrapper pb-2">
            <div className="gallery">
              <ImageGallery items={imagesTest} />
            </div>
          </div>
          <div className="table__car_detail">
            <TableCarDetail items={carDetail} />
          </div>
        </div>
      </div>
      <div className="mt-3 right_container">
        <div className="price_container"></div>
        <p className="picker_title">เปลี่ยนวันที่</p>
        <div className="details_box_wrapper">
          <div className="calendar_picker_wrapper">
            <RangePicker
              renderExtraFooter={() => "extra footer"}
              showTime
              placeholder={[
                "เปลี่ยนวันที่และเวลารับรถ",
                "เปลี่ยนวันที่และเวลาคืนรถ",
              ]}
              size="large"
            />
          </div>
        </div>
        <div className="price_wrapper">
          <div className="title_price">รายละเอียดสรุปค่าเช่ารถ</div>
          <div className="row-price">
            <div className="col-auto mr-auto">ค่าเช่ารถสำหรับ 2 วัน</div>
            <div className="col-auto">฿2,120</div>
          </div>
          <div className="row-price">
            <div className="col-auto mr-auto">ค่ารับ - ส่งรถ</div>
            <div className="col-auto"><span className="red">ฟรี!</span></div>
          </div>
          <div className="row-price summary-price">
            <div className="col-auto mr-auto">ราคารวม</div>
            <div className="col-auto">฿2,120</div>
          </div>
        </div>
          <div className="button_box">
          <Link to='/search-car-book'><button className="btn btn-primary">เลือกรถคันนี้</button></Link>
          </div>
      </div>
    </div>
  );
};

export default BookingDetail;
