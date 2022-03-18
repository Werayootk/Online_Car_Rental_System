import React, { useEffect, useState } from "react";
import "./ProgressBar.scss";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { Steps } from "antd";
import { useLocation } from 'react-router-dom';

const { Step } = Steps;
const pathNameCheck = ['/search-car', '/search-car-detail', '/search-car-book', '/search-car-verify'];

const ProgressBar = (props) => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const pathname = location.pathname.match(/[/][a-z-A-z]*/)?.toString();

  useEffect(() => {
    if (pathname === pathNameCheck[0]) { return setCurrent(0) };
    if (pathname === pathNameCheck[1]) { return setCurrent(1) };
    if (pathname === pathNameCheck[2]) { return setCurrent(2) };
    if (pathname.includes(pathNameCheck[3])) { return setCurrent(3) };
  },[pathname])

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
