import React,{ useState } from "react";
import "./CardCarDetail.scss";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
import { HashRouter as Router, Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../storage/reducers/bookingSlice";
import formatBATH from '../../util/formatBATH';
import mappingCarType from '../../util/mappingCarType';

const CardCarDetail = (props) => {
  const bookingItems = useSelector((state) => state.booking.bookingList);
  const bookingItem = bookingItems[bookingItems.length - 1];
  const { items } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickUpdateCarDetail = (index) => {
    const selectedThisCar = items[index];
    const paramCarDetail = `?car_id=${selectedThisCar.id}&car_brand=${selectedThisCar.car_brand}`;
    const totalPrice = Number(bookingItem.diff_days) * Number(selectedThisCar.car_price);
    console.log(paramCarDetail);
    dispatch(
      bookingActions.updateCarToBookingList({
        index: (bookingItems.length - 1),
        carId: selectedThisCar.id,
        car: selectedThisCar.car_brand,
        car_price: selectedThisCar.car_price,
        total_price: totalPrice
      })
    )
    history.push(`/search-car-detail${paramCarDetail}`);
  };
 
  return items?.map((item, index) => (
    <div className="col-card" key={item.id}>
      <div className="car-card--candidate">
        <section>
          <div className="avatar">
            <img src={item.Image_cars[0].img_url} className="img-car" width={355} height={240} />
          </div>
        </section>
        <section>
          <header>
            <h2>
              <span className="mr-1">{item.car_brand}</span>
            </h2>
          </header>
          <section className="body">
            <div>
              <div className="padding-content">
                <CarOutlined /> <span>{mappingCarType(item.car_type)}</span>
              </div>
              <div className="padding-content">
                <UserOutlined />
                <span>{item.car_seat}</span>
              </div>
              <div className="padding-content">
                <img src="/images/gear.svg" />
                <span>{item.car_transmission}</span>
              </div>
            </div>
            <div className="align-right">
              <div className="price">
                <h3>
                  {item.car_price}<small> บาท/วัน</small>
                </h3>
                <div className="total">รวม {formatBATH(Number(bookingItem.diff_days)*Number(item.car_price))}</div>
              </div>
            </div>
          </section>
          <div className="btn-detail">
            <div className="link-car">
              <button className="btn btn-primary rent-button" onClick={onClickUpdateCarDetail.bind(this,index)}>
                ดูรายละเอียดก่อนจอง
              </button>
              </div>
          </div>
        </section>
      </div>
    </div>
  ));
};

export default CardCarDetail;
