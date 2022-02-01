import React from "react";
import './Header.scss';
import { Menu, Dropdown, Input, DatePicker, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";

const Header = () => {
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
  );
};

export default Header;
