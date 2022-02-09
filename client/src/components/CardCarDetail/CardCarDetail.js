import React from "react";
import "./CardCarDetail.scss";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';

const CardCarDetail = (props) => {

  return props.items.map((v, i) => (
    <div className="col-card" key={v.id}>
      <div className="car-card--candidate">
        <section>
          <div className="avatar">
            <img src={v.thumbnail_images[0]} className="img-car" />
          </div>
        </section>
        <section>
          <header>
            <h2>
              <span className="mr-1">{v.title.th}</span>
            </h2>
          </header>
          <section className="body">
            <div>
              <div className="padding-content">
                <CarOutlined /> <span>{v.type}</span>
              </div>
              <div className="padding-content">
                <UserOutlined />
                <span>{v.passengers}</span>
              </div>
              <div className="padding-content">
                <img src="/images/gear.svg" />
                <span>{v.transmission}</span>
              </div>
            </div>
            <div className="align-right">
              <div className="price">
                <h3>
                  950<small>/วัน</small>
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
