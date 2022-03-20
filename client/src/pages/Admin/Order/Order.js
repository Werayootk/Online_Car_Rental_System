import React from 'react';
import './Order.scss';
import ResponsibilityOrder from './ResponsibilityOrder';
import { Tabs, Row, Col, Modal } from "antd";

const Order = () => {
    return (
        <div className="order-container">
        <Row>
          <Col span={20} style={{ paddingLeft: 22 }}>
            <ResponsibilityOrder />
          </Col>
        </Row>
      </div>
    );
}

export default Order;
