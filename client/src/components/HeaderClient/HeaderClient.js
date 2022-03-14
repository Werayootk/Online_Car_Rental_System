import React, { useState, useEffect } from "react";
import "./HeaderClient.scss";
import { Menu, Dropdown, Input, DatePicker, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import localStorageServices from "../../services/localStorageUserServices";

const { getRole } = localStorageServices;

const HeaderClient = (props) => {
  const [role, setRole] = useState(getRole());

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <Link to="/profile">แก้ไขข้อมูลส่วนตัว</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="/editpassword">แก้ไขรหัสผ่าน</Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to="/booking">การเช่ารถของฉัน</Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <Link to="/logout">ออกจากระบบ</Link>
      </Menu.Item>
    </Menu>
  );

  const menuHelp = (
    <Menu>
      <Menu.Item key={5}>
        <Link to="/">วิธีการจอง</Link>
      </Menu.Item>
      <Menu.Item key={6}>
        <Link to="/">เอกสารเช่ารถ</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="Main navbar navbar-expand-lg collapsed shadow">
      <div className="Main__header">
        <Link to="/">
          <div className="Main__Logo"></div>
        </Link>
      </div>
      <div className="Main__nav">
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

        {role === "user" && (
          <div className="Main__login">
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                บัญชีของฉัน
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        )}

        {role === undefined && (
          <div className="Main__login">
            <Link to="/login">เข้าสู่ระบบ</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderClient;
