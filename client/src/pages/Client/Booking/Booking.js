import React, { useState, useEffect } from "react";
import "./Booking.scss";
import CardCarCategory from "../../../components/CardCarCategory/CardCarCategory";
import CardCarDetail from "../../../components/CardCarDetail/CardCarDetail";
import { CarType } from "../../../config/car_type";
import { carData } from "../../../mockup/car_data";

/** TODO 8
 * 1. axios data car availiable to setState send to Card
 * 2. implement infinity scroll down fetch data
 * 3. implement filter and sort
 * 4. click car detail to redirect save state car detail
 */

const Booking = () => {
  const [carType, setCarType] = useState(CarType);
  const [CarData, setCarData] = useState(carData);
  const [isActiveClear, setActiveClear] = useState(false);
  const [isActiveSortPrice, setActiveSortPrice] = useState(false);
  const [valCarCategory, setValCarCategory] = useState(); //return ?car_type Data tracking by useEffect

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
              <span className="clean-btn" onClick={()=>setActiveClear(!isActiveClear)}>ล้างค่าทั้งหมด</span>
            </div>
            <div className="filter__tab ">
              <div className="tab-header">
                <p className="tab-title">ขนาดรถ</p>
              </div>
              <div className="tab-content">
                <div className="filter-category">
                  <div className="category-item d-inline-flex flex-row flex-wrap">
                    <CardCarCategory
                      items={carType}
                      sendClear={isActiveClear}
                      onChange={(val) => {
                        setValCarCategory(val);
                        console.log(val);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="filter-bar">
            <div className="car-summary">
              พบรถว่าง 105 คัน จาก 21 บริษัทรถเช่าและตรงกับตัวกรองของคุณ{" "}
              <span className="clean-btn" onClick={()=>setActiveClear(!isActiveClear)}>ล้างค่าทั้งหมด</span>
            </div>
            <div className="filter-badge"></div>
            <div className="filter-sort">
              <div className="sort-item sort-item--title">เรียงโดย</div>
              <div className={isActiveSortPrice ? `sort-item active` : `sort-item`} onClick={()=>setActiveSortPrice(!isActiveSortPrice)}>ราคารวม (จากสูงสุดก่อน)</div>
              <div className={!isActiveSortPrice ? `sort-item active` : `sort-item`} onClick={()=>setActiveSortPrice(!isActiveSortPrice)}>ราคารวม (จากต่ำสุดก่อน)</div>
            </div>
          </div>
          <div className="row car-listing">
            <div></div>
            <CardCarDetail items={CarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
