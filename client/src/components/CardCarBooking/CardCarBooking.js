import React from "react";
import "./CardCarBooking.scss";
import { Pagination } from 'antd';

const CardCarBooking = (props) => {
  return (
    <>
      <div className="booking-card card">
        <div className="booking-card__body d-flex flex-row finished card-body">
          <img
            className="card-img-top d-none d-lg-block rounded-0"
            src="https://assets.drivehub.co/uploads/car/photo/attachment/38170/medium_bc4f3aa0-e6f0-444d-9160-5a706e104afb.jpg"
          />
          <div className="booking-detail">
            <div className="d-flex">
              <div className="booking-detail-item ">
                หมายเลขการจอง<p className="font-weight-bold">637467</p>
              </div>
              <div className="booking-detail-item ">
                สถานะการจอง<p className="font-weight-bold">การเช่าเสร็จสิ้น</p>
              </div>
            </div>
            <div className="d-flex py-1">
              <div className="booking-detail-item ">
                รับรถที่<p className="">แยกติวานนท์</p>
              </div>
            </div>
            <div className="d-flex">
              <div className="booking-detail-item ">
                วัน/เวลารับรถ<p className="">25 ธ.ค. 21 (20:00 น.)</p>
              </div>
              <div className="booking-detail-item ">
                วัน/เวลาคืนรถ<p className="">27 ธ.ค. 21 (20:00 น.)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-card__footer card-footer">
          <p className="text-center">แสดงรายละเอียด</p>
        </div>
      </div>
      <div className="booking-pagination">
      <Pagination defaultCurrent={1} total={50} />
    </div>    
    </>
  );
};

export default CardCarBooking;
