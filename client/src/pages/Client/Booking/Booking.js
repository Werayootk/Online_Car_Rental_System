import React, { useState, useEffect } from "react";
import "./Booking.scss";
import CardCarCategory from "../../../components/CardCarCategory/CardCarCategory";
import CardCarDetail from "../../../components/CardCarDetail/CardCarDetail";
import { CarType } from "../../../config/car_type";
import { carData } from '../../../mockup/car_data';

/** TODO 8
 * 1. axios data car availiable to setState send to Card
 * 2. implement infinity scroll down fetch data
 * 3. implement filter and sort axios
 * 4. click car detail to redirect save state car detail
 */

const Booking = () => {
  const [carType, setCarType] = useState(CarType);
  const [CarData, setCarData] = useState(carData);

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
              <span className="clean-btn">ล้างค่าทั้งหมด</span>
            </div>
            <div className="filter__tab ">
              <div className="tab-header">
                <p className="tab-title">ขนาดรถ</p>
              </div>
              <div className="tab-content">
                <div className="filter-category">
                  <div className="category-item d-inline-flex flex-row flex-wrap">
                    <CardCarCategory items={carType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="filter-bar">
            <div className="car-summary">พบรถว่าง 105 คัน จาก 21 บริษัทรถเช่าและตรงกับตัวกรองของคุณ  <span className="clean-btn">ล้างค่าทั้งหมด</span></div>
            <div className="filter-badge"></div>
            <div className="filter-sort">
              <div className="sort-item sort-item--title">เรียงโดย</div>
              <div className="sort-item ">จำนวนครั้งที่ถูกเช่า</div>
              <div className="sort-item active">ราคารวม (จากต่ำสุดก่อน)</div>
            </div>
          </div>
          <div className="row car-listing">
            <div></div>
            <CardCarDetail items={ CarData }/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
