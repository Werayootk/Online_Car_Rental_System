import React from "react";
import "./Customer.scss";
import { Row, Col } from "antd";
import ResponsibilityCustomer from "./ResponsibilityCustomer";

/** TODO 13
 * 1. sync data source with paginate
 * 2. spin
 * 3. filter by
 * 4. Modal for EDIT data 
 */

const Customer = () => {

  return (
    <div className="customer-container">
      <Row>
        <Col span={20} style={{ paddingLeft: 22 }}>
          <ResponsibilityCustomer />
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
