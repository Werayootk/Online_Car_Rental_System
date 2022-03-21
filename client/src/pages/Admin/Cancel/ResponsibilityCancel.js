import React, { useState, useEffect } from "react";
import './Cancel.scss';
import { Col, Row, Modal, Button, Form, Input, notification  } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterCancel from './SearchFilterCancel';
import Table from "../../../components/Table/Table";
import { CANCEL_FILTER_OPTIONS } from '../../../config/filter';

const { Column } = Table;

const ResponsibilityCancelElement = (props) => {
    const handleFilterOptionChange = (value) => {
        console.log(value);
    }

    const handleSearchChange = (value) => {
        console.log(value);
    }

    const filterOptions = [{text: 'ทั้งหมด', value: 'ALL'}, ...CANCEL_FILTER_OPTIONS];

    return (
        <Row>
        <Col span={24}>
          <SearchFilterCancel
            filters={{ options: filterOptions, defaultValue: 'ALL' }}
            onFilterChange={handleFilterOptionChange}
          />
        </Col>
        <Col className="cancel-table-container" span={24}>
          <Table
            pagination={props.pagination}
            loading={props.loading}
          >
            <Column key="No." title="No." />
            <Column
              key="firstname"
              title="First Name"
            />
            <Column
              key="lastname"
              title="Last Name"
            />
            <Column
              key="order"
              title="Orders No."
            />
           <Column
              key="status"
              title="Status"
            />
            <Column
              key="action"
              title="ดูรายละเอียด"
              render={() => (
                <span className="cancel-table-action-icon">
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
    );
};

export default ResponsibilityCancelElement;