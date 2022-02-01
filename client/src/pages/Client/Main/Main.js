import React from "react";

import "./Main.scss";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { Menu, Dropdown, Input, DatePicker, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

import Footer from "./Footer";
const { Search } = Input;
const { RangePicker } = DatePicker;
const onSearch = (value) => console.log(value);

const Main = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined />} disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <nav class="Main">
        <div className="Main__header">
          <Link to="/">
            <div className="Main__Logo"></div>
          </Link>
        </div>
        <div class="Main__nav">
          <div className="Main__help">
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                ความช่วยเหลือ
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <div className="Main__login">
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                เข้าสู่ระบบ
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
      </nav>
      <section className="mainSection">
        <section className="mainSectionBG">
          <section class="main__banner_container">
            <div className="main__Overlay"></div>
            <div className="main__content_section">
              <div className="main__heading_text">
                <h1 className="main__heading_text_h1">
                  ค้นหารถเช่าราคาถูกที่สุด
                </h1>
                <h4 className="main__heading_text_h4">
                  ใช้บริการรถเช่าทั่วประเทศ
                </h4>
              </div>
              <div className="main__search_box">
                <div className="main__search_box_container">
                  <div className="main_search_car">
                    {/*Input Component serach car*/}
                    <Search
                      placeholder="ค้นหาสถานที่รับรถ"
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch}
                    />
                  </div>
                  <div className="main_search_date">
                    {/*Input Component calandar */}
                    <RangePicker showTime size={"large"} />
                  </div>
                  <div className="main_search_button">
                    {/*Input Component Button submit */}
                    <Button type="primary" block>
                      ค้นหารถว่าง
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Main;
