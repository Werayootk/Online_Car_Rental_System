import React, { useState } from "react";
import "./ProgressBar.scss";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { Steps } from "antd";

const { Step } = Steps;

const ProgressBar = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="progress-book">
      <Steps current={current} onChange={setCurrent} type="navigation">
        <Step title={<Link to={"/search-car"}>ผลการค้นหา</Link>} />
        <Step title={<Link to={"/search-car-detail"}>รายละเอียดรถ</Link>} />
        <Step title={<Link to={"/search-car-book"}>ข้อมูลการจอง</Link>} />
        <Step title={<Link to={"/search-car-verify"}>ตรวจสอบข้อมูล</Link>} />
      </Steps>
    </div>
  );
};

export default ProgressBar;
