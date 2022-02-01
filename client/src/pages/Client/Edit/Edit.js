import React from "react";
import "./Edit.scss";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import {
  UserOutlined,
  KeyOutlined,
  LoginOutlined,
  CarOutlined
} from '@ant-design/icons';

const Edit = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="user-menu d-none d-lg-block px-0 px-lg-3 col-lg-3">
            <div className="list-group" role="tablist">
              <button
                id="menu-user-profile"
                role="tab"
                className="list-group-item list-group-item-action"
              >
                <UserOutlined /> แก้ไขข้อมูลส่วนตัว
              </button>
              <button
                id="menu-user-password"
                role="tab"
                className="list-group-item list-group-item-action"
              >
                <KeyOutlined /> แก้ไขรหัสผ่าน
              </button>
              <button
                id="menu-user-booking"
                role="tab"
                className="active list-group-item list-group-item-action"
              >
                <CarOutlined /> การเช่ารถของฉัน
              </button>
              <button
                id="menu-user-logout"
                role="tab"
                className="list-group-item list-group-item-action"
              >
                <LoginOutlined /> ออกจากระบบ
              </button>
            </div>
          </div>
          <div className="px-0 py-0 px-lg-3 py-lg-0 col-lg-9">
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
