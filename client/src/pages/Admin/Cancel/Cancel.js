import React from 'react';
import './Cancel.scss';
import ResponsibilityCancel from './ResponsibilityCancel';
import { Tabs, Row, Col, Modal } from "antd";

const Cancel = () => {
    return (
        <div className="cancel-container">
        <Row>
          <Col span={20} style={{ paddingLeft: 22 }}>
            <ResponsibilityCancel
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

export default Cancel;
