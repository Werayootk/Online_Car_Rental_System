import React from "react";
import './Customer.scss';
import { Col, Row } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterCustomer from './SearchFilterCustomer';
import Table from "../../../components/Table/Table";

import { TablePaginationConfig } from 'antd/es/table';
import { ColumnType } from 'antd/es/table';
import { CUSTOMER_FILTER_OPTIONS } from '../../../config/filter';

const { Column } = Table

const ResponsibilityElement = (props) => {
    const handleFilterOptionChange = (value) => {
        console.log(value);
    }

    const handleSearchChange = (value) => {
        console.log(value);
    }

    const filterOptions = [{text: 'ทั้งหมด', value: 'ALL'}, ...CUSTOMER_FILTER_OPTIONS];

    return (
        <Row>
        <Col span={24}>
          <SearchFilterCustomer
            filters={{ options: filterOptions, defaultValue: 'ALL' }}
            onFilterChange={handleFilterOptionChange}
          />
        </Col>
        <Col className="customer-table-container" span={24}>
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
              key="Tel"
              title="Tel"
            />
           <Column
              key="email"
              title="Email"
            />
           <Column
              key="ID"
              title="ID"
            />
            <Column
              key="action"
              title="ดูรายละเอียด"
              render={() => (
                <span className="customer-table-action-icon">
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
    );
};

export default ResponsibilityElement;
