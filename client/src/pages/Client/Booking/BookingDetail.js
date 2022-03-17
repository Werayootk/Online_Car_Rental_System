import React, { useState, useEffect } from "react";
import "./BookingDetail.scss";
import ImageGallery from "react-image-gallery";
import { DatePicker, Space } from "antd";
import TableCarDetail from "../../../components/TableCarDetail/TableCarDetail";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import useQuery from '../../../hooks/useQuery';
import { useDispatch, useSelector } from "react-redux";
import formatBATH from "../../../util/formatBATH";
import mappingImgUrl from "../../../util/mappingImgUrl";
import { bookingActions } from "../../../storage/reducers/bookingSlice";
import searchCarServices from "../../../services/searchCarServices";

const BookingDetail = (props) => {
  const bookingItems = useSelector((state) => state.booking.bookingList);
  const bookingItem = bookingItems[bookingItems.length - 1];
  const [getCarData, setGetCarData] = useState();
  const [imageCars, setImageCars] = useState();
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const { RangePicker } = DatePicker;

  const fetchCarDetail = async (id) => {
    await searchCarServices.getCarDetailById(id).then(res => {
      setGetCarData(res.data);
      setImageCars(res.data.Image_cars);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    const carId = query.get("car_id");
    fetchCarDetail(carId);
  }, []);

  return (
    <div className="container merged_container">
      <div className="mt-3 left_container">
        <div className="header_container">
          <div className="header_left">
            <h3>{getCarData?.car_brand}</h3>
            <div className="branch_content"></div>
          </div>
          <div className="header_right"></div>
          <div className="gallery_wrapper pb-2">
            <div className="gallery">
              {!loading && <ImageGallery items={mappingImgUrl(imageCars)} />}
            </div>
          </div>
          <div className="table__car_detail">
            {!loading && <TableCarDetail carList={getCarData} />}
          </div>
        </div>
      </div>
      <div className="mt-3 right_container">
        <div className="price_container"></div>
        {/* <p className="picker_title">เปลี่ยนวันที่</p>
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
        </div> */}
        <div className="price_wrapper">
          <div className="title_price">รายละเอียดสรุปค่าเช่ารถ</div>
          <div className="row-price">
            <div className="col-auto mr-auto">ค่าเช่ารถสำหรับ {bookingItem.diff_days} วัน</div>
            <div className="col-auto">{formatBATH(bookingItem.total_price)}</div> 
          </div>
          <div className="row-price">
            <div className="col-auto mr-auto">ค่ารับ - ส่งรถ</div>
            <div className="col-auto"><span className="red">ฟรี!</span></div>
          </div>
          <div className="row-price summary-price">
            <div className="col-auto mr-auto">ราคารวม</div>
            <div className="col-auto">{formatBATH(bookingItem.total_price)}</div>
          </div>
        </div>
          <div className="button_box">
          <Link to='/search-car-book'><Button type="primary">เลือกรถคันนี้</Button></Link>
          <Link to='/search-car'><Button >ย้อนกลับ</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
