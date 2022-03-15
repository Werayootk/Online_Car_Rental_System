import React from "react";
import "./CardCarDetail.scss";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const CardCarDetail = (props) => {
  const { items } = props;

  return items.data?.map((item) => (
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
                <CarOutlined /> <span>{item.car_type}</span>
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
                  {item.car_price}<small>/วัน</small>
                </h3>
                <div className="total">รวม ฿1,900</div>
              </div>
            </div>
          </section>
          <div className="btn-detail">
            <button className="btn btn-primary rent-button">
            <Link to='/search-car-detail' className="link-car">{" ดูรายละเอียดก่อนจอง "}
              </Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  ));
};

export default CardCarDetail;
