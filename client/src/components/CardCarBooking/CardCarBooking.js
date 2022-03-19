import React,{ useState } from "react";
import "./CardCarBooking.scss";
import Moment from 'react-moment';
import { useHistory } from "react-router-dom";
import mappingBookingStatus from "../../util/mappingBookingStatus";

const CardCarBooking = (props) => {
  const { booking } = props;
  const history = useHistory();

  const onClickToDisplay = (index, booking_no) => {
    console.log(index, booking_no);
    const params = `?booking_no=${booking_no}`;
    history.push(`search-car-verify${params}`);
  };

  return booking?.map((item, index) => 
    <div className="booking-card card" key={item.id}>
      <div className="booking-card__body d-flex flex-row finished card-body">
        <img
            className="card-img-top d-none d-lg-block rounded-0"
            src={item.Car.Image_cars[0].img_url}
        />
        <div className="booking-detail">
          <div className="d-flex">
            <div className="booking-detail-item ">
              หมายเลขการจอง<p className="font-weight-bold">{item.booking_no}</p>
            </div>
            <div className="booking-detail-item ">
              สถานะการจอง<p className="font-weight-bold">{mappingBookingStatus(item.booking_status)}</p>
            </div>
          </div>
          <div className="d-flex py-1">
            <div className="booking-detail-item ">
              รับรถที่<p className="">{item.pickup_location}</p>
            </div>
          </div>
          <div className="d-flex">
               <div className="booking-detail-item ">
                 วัน/เวลารับรถ<p className=""><Moment format="DD-MM-YYYY hh:mm:ss" date={item.start_datetime} /></p>
              </div>
               <div className="booking-detail-item ">
                 วัน/เวลาคืนรถ<p className=""><Moment format="DD-MM-YYYY hh:mm:ss" date={item.end_datetime} /></p>
              </div>
            </div>
        </div>
      </div>
           <div className="booking-card__footer card-footer" onClick={onClickToDisplay.bind(this, index, item.booking_no)}>
         <p className="text-center">แสดงรายละเอียด</p>
         </div>
    </div>
  );
};

export default CardCarBooking;
