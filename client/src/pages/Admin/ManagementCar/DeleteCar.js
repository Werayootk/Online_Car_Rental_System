import React from "react";
import './ManagementCar.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import { Tabs, Row, Col, Modal } from "antd";
import ResponsibilityCar from './ResponsibilityCar';

const DeleteCar = (props) => {
    return (
        <div className="car-container">
        <Row>
          <Col span={20} style={{ paddingLeft: 22 }}>
            <ResponsibilityCar
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

export default withRouter(DeleteCar);