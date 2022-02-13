import React from "react";
import './Order.scss';
import { Col, Row } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterOrder from './SearchFilterOrder';
import Table from "../../../components/Table/Table";

import { TablePaginationConfig } from 'antd/es/table';
import { ColumnType } from 'antd/es/table';
import { ORDER_FILTER_OPTIONS } from '../../../config/filter';

const { Column } = Table;

const ResponsibilityOrderElement = (props) => {
    const handleFilterOptionChange = (value) => {
        console.log(value);
    }

    const handleSearchChange = (value) => {
        console.log(value);
    }

    const filterOptions = [{text: 'ทั้งหมด', value: 'ALL'}, ...ORDER_FILTER_OPTIONS];

    return (
        <Row>
        <Col span={24}>
          <SearchFilterOrder
            filters={{ options: filterOptions, defaultValue: 'ALL' }}
            onFilterChange={handleFilterOptionChange}
          />
        </Col>
        <Col className="order-table-container" span={24}>
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
                <span className="order-table-action-icon">
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
    );
};

export default ResponsibilityOrderElement;
