import React from "react";
import "./Customer.scss";
import { Tabs, Row, Col, Modal } from "antd";

import ResponsibilityCustomer from "./ResponsibilityCustomer";

const Customer = () => {
  return (
    <div className="customer-container">
      <Row>
        <Col span={20} style={{ paddingLeft: 22 }}>
          <ResponsibilityCustomer
            dataSource={null}
            pagination={{
              onChange: null,
              total: 50,
              showSizeChanger: false,
            }}
            loading={null}
            currentPagination={1}
            onPagination={null}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
