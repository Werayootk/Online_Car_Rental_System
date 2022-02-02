import React from "react";
import "./HeaderClient.scss";
import { Menu, Dropdown, Input, DatePicker, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";

const HeaderClient = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">แก้ไขข้อมูลส่วนตัว</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/editpassword">แก้ไขรหัสผ่าน</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/booking">การเช่ารถของฉัน</Link>
      </Menu.Item>
    </Menu>
  );

  const menuHelp = (
    <Menu>
      <Menu.Item>
        <Link to="/">วิธีการจอง</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">เอกสารเช่ารถ</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav class="Main navbar navbar-expand-lg collapsed shadow">
      <div className="Main__header">
        <Link to="/">
          <div className="Main__Logo"></div>
        </Link>
      </div>
      <div class="Main__nav">
        <div className="Main__help">
          <Dropdown overlay={menuHelp}>
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
  );
};

export default HeaderClient;
