import React from 'react';
import './Order.scss';
import ResponsibilityOrder from './ResponsibilityOrder';
import { Tabs, Row, Col, Modal } from "antd";

/** TODO 14
  * 1. sync data source with paginate
 * 2. spin
 * 3. filter by
 * 4. Modal for EDIT data 
 */

const Order = () => {
    return (
        <div className="order-container">
        <Row>
          <Col span={20} style={{ paddingLeft: 22 }}>
            <ResponsibilityOrder
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
}

export default Order;
