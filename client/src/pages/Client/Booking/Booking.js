import React from "react";
import "./Booking.scss";

const Booking = () => {

  return (
    <div className="search-container container">
      <div className="row">
        <div className="col-lg-4" style={{position: 'relative', marginBottom: '15px'}}>
          <div className="filter-section">
            <div className="filter__header">
              <p>ฟิลเตอร์</p>
              <span class="clean-btn">ล้างค่าทั้งหมด</span>
            </div>
            <div className="filter__tab ">
              <div className="tab-header">
                <p class="tab-title">ขนาดรถ</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          row 2
        </div>
      </div>
    </div>
  );
};

export default Booking;
