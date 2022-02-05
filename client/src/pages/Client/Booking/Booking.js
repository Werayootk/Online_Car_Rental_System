import React, { useState, useEffect } from "react";
import "./Booking.scss";
import { CarType } from "../../../config/car_type";
import CardCarCategory from "../../../components/CardCarCategory/CardCarCategory";

const Booking = () => {
  const [carType, setCarType] = useState(CarType);

  return (
    <div className="search-container container">
      <div className="row">
        <div
          className="col-lg-4"
          style={{ position: "relative", marginBottom: "15px" }}
        >
          <div className="filter-section">
            <div className="filter__header">
              <p>ฟิลเตอร์</p>
              <span class="clean-btn">ล้างค่าทั้งหมด</span>
            </div>
            <div className="filter__tab ">
              <div className="tab-header">
                <p class="tab-title">ขนาดรถ</p>
              </div>
              <div className="tab-content">
                <div className="filter-category">
                  <div className="category-item d-inline-flex flex-row flex-wrap">
                    <CardCarCategory carCategory={carType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">row 2</div>
      </div>
    </div>
  );
};

export default Booking;
