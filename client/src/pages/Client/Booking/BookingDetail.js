import React, { useState, useEffect } from "react";
import "./BookingDetail.scss";
import { carData } from "../../../mockup/car_data";
import { Image } from "antd";

const BookingDetail = (props) => {
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
                <Image
                  className="sliderimg"
                  src="https://assets.drivehub.co/uploads/car/photo/attachment/22716/fa2e472d-305a-4654-b0ef-8428d5c9b536.jpg"
                          />                          
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
