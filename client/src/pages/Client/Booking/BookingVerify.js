import React, { useState, useEffect } from "react";
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
import { Spin, notification, Button } from "antd";
import { ReactComponent as Gear } from "../../../assets/images/gear.svg";
import ImageGallery from "react-image-gallery";
import myBookingService from "../../../services/myBookingServices";
import useQuery from '../../../hooks/useQuery';
import { useLocation } from "react-router-dom";
import mappingImgUrl from "../../../util/mappingImgUrl";
import formatBATH from "../../../util/formatBATH";
import mappingCarType from "../../../util/mappingCarType";
import formatDatetime from '../../../util/formatDatetime';
import Moment from 'react-moment';

const BookingVerify = (props) => {
  const query = useQuery();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState();
  const [bookingNo, setBookingNo] = useState();
  const [imgUrlCar, setImgUrlCar] = useState([]);

  const onClickCancelBooking = async () => {
    const booking_no = query.get("booking_no");
    await myBookingService.cancelBookingById(booking_no).then(res => {
      notification.success({
        message: res.data.message
      });
    }).catch(err => {
      console.error(err);
    });
  }

  const fetchBookingData = async (booking_no) => {
    setLoading(false);
    await myBookingService.getBookingByStatus(booking_no).then(res => {
      setBookingData(res.data.data);
      setImgUrlCar([...res.data.data.Car.Image_cars]);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(true);
    })
  }

  useEffect(() => {
    const bookingNumber = query.get("booking_no"); 
    setBookingNo(bookingNumber);
    fetchBookingData(bookingNumber);
  }, []);

  return (
    <div className="container merged_container">
      <div className="left_container_verify">
        <div className="booking-status">
          <div className="status-header">
            <div>
              <small>หมายเลขการจอง</small>
              <p>{bookingData?.booking_no}</p>
              <small>สถานะการจอง</small>
            </div>
          </div>
          <StepProgressVerify booking_status={bookingData?.booking_status} />
        </div>
        <div className="customer-detail">
          <p>ข้อมูลผู้เช่ารถ</p>
          <div className="detail-items">
            <div className="item">
              <UserOutlined /> <span>{bookingData?.User.first_name}{ " " }{bookingData?.User.last_name}</span> 
            </div>
            <div className="item">
              <PhoneOutlined /> <span>{bookingData?.User.phone_number}</span>
            </div>
            <div className="item">
              <MailOutlined /> <span>{bookingData?.User.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right_container_verify">
        <div className="cardetail">
          <h3>ข้อมูลรถเช่า</h3>
          <div className="gallery_wrapper_verify pb-2">
            <div className="gallery">
            {<ImageGallery items={mappingImgUrl(imgUrlCar)} />}
            </div>
            <p className="title">{bookingData?.Car.car_brand}</p>
            <h4>ข้อมูลรถ</h4>
            <div className="detail">
              <div className="pair">
                <CarOutlined /> {mappingCarType(bookingData?.Car.car_type)}{" "}
              </div>
              <div className="pair">
                <Gear fontSize={"14px"} /> {bookingData?.Car.car_transmission}{" "}
              </div>
              <div className="pair">
                <TeamOutlined /> {bookingData?.Car.car_seat} ที่นั่ง
              </div>
              <div className="pair">
                <TrademarkCircleOutlined /> จดทะเบียน {bookingData?.Car.car_register}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="rentaldetail">
          <div className="padding__inner">
            <h3>ข้อมูลการเช่ารถ</h3>
            <h4>สถานที่รับรถ/คืนรถ</h4>
            <p className="border__bottom">{bookingData?.pickup_location}</p>
            <div className="pickup__return border__bottom">
              <div>
                <h4>วันที่รับรถ</h4>
                <p><Moment format="DD-MM-YYYY" date={bookingData?.start_datetime} /></p>
                <p><Moment format="hh:mm:ss" date={bookingData?.start_datetime} /></p>
              </div>
              <div className="border__left">
                <h4>วันที่คืนรถ</h4>
                <p><Moment format="DD-MM-YYYY" date={bookingData?.end_datetime} /></p>
                <p><Moment format="hh:mm:ss" date={bookingData?.end_datetime} /></p>
              </div>
            </div>
            <div>
              <h4>ค่าเช่า</h4>
              <div className="pair__full">
                <p>ค่าเช่ารถต่อวัน</p>
                <p>{formatBATH(bookingData?.Car.car_price)}</p>
              </div>
              <div className="pair__full">
                <p>ค่าบริการรับ-ส่งรถ</p>
                <p>ฟรี</p>
              </div>
            </div>
          </div>
          <div className="pair__full pair__full--total mb0">
            <div>
              <p>ราคารวม</p>
            </div>
            <p className="total">{formatBATH(bookingData?.Billing.total_amount)}</p>
          </div>
          <div className="padding__inner">
            <div className="pair__full center">
              <Button size="small" onClick={onClickCancelBooking.bind(this)}>
                <small
                  style={{ fontSize: "14px", textDecoration:"underline",color:"red", cursor:"pointer"}}
                >
                  ยกเลิกการจอง
                </small>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingVerify;
