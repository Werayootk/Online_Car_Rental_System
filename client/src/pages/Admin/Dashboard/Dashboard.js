import React, { useState } from "react";
import "./Dashboard.scss";
import {
  Row,
  Col,
  Space,
  Card,
  Progress,
  Spin,
  Modal,
  DatePicker,
  Button,
} from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;
/** TODO 12
 * 1. axios show data
 * 2. axios by filter data
 */

const onSubmit = () => {
  console.log("Click");
};

const FilterDatePicker = (props) => {
  return (
      <div id="date-box">
      <Row align="middle">
        <Col span={16}>
          <RangePicker
            showTime
            size={"large"}
            placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
          />
        </Col>
        <Col span={8}>
          <Button onClick={onSubmit}>สรุปผลข้อมูล</Button>
        </Col>
      </Row>
    </div>
  );
};

const CardContainer = (props) => (
    <Row>
    <Col lg={{ span:24 }} sm={{ span:24 }}>
        <div id="card-box" >
          <span className="title">รายงานสรุปผล</span>
          <div className="content">
            <Row>
              <Col span={8}>
              <Card style={{ color:'#FF6B00', backgroundColor: '#fdf2d0', borderRadius: 10 }}>
                <div className="lable">รอการอนุมัติจอง</div>
                <div className="lable-lg">{ 0 }</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ color:'#D2283C', backgroundColor: '#FFC2CA', borderRadius: 10 }}>
                <div className="lable">จำนวนการยกเลิกการจอง</div>
                <div className="lable-lg">{ 0 }</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ color:'#26A69A', backgroundColor: '#E3FFED', borderRadius: 10 }}>
                <div className="lable">รายได้</div>
                <div className="lable-lg">{ 0 }</div>
              </Card>
            </Col>
            </Row>
            <Row>
            <Col span={8}>
              <Card style={{ color:'#2B3E92', backgroundColor: '#FFFFFF', borderRadius: 10 }}>
                <div className="lable">จำนวนรถที่ว่าง</div>
                <div className="lable-lg">{ 0 }</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ color:'#FFFFFF', backgroundColor: '#2B3E92', borderRadius: 10 }}>
                <div className="lable">จำนวนรถที่ใช้ไป</div>
                <div className="lable-lg">{ 0 }</div>
              </Card>
            </Col>
          </Row>
          </div>
        </div>
      </Col>
    </Row>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="Dashboard">
      <FilterDatePicker />
          <Spin spinning={loading}>
          <CardContainer />
      </Spin>
    </div>
  );
};

export default Dashboard;
