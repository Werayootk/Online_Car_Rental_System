import React from "react";
import './Location.scss';
import { Col, Row } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterLocation from './SearchFilterLocation';
import Table from "../../../components/Table/Table";

import { TablePaginationConfig } from 'antd/es/table';
import { ColumnType } from 'antd/es/table';
import { LOCATION_FILTER_OPTIONS } from '../../../config/filter';

const { Column } = Table

const ResponsibilityLocationElement = (props) => {
    const handleFilterOptionChange = (value) => {
        console.log(value);
    }

    const handleSearchChange = (value) => {
        console.log(value);
    }

    const filterOptions = [{text: 'ทั้งหมด', value: 'ALL'}, ...LOCATION_FILTER_OPTIONS];

    return (
        <Row>
        <Col span={24}>
          <SearchFilterLocation
            filters={{ options: filterOptions, defaultValue: 'ALL' }}
            onFilterChange={handleFilterOptionChange}
          />
        </Col>
        <Col className="location-table-container" span={24}>
          <Table
            pagination={props.pagination}
            loading={props.loading}
          >
            <Column key="No." title="No." />
            <Column
              key="ID"
              title="ID"
            />
            <Column
              key="province"
              title="Province"
            />
            <Column
              key="location"
              title="Location"
            />
            <Column
              key="action"
              title="ดูรายละเอียด"
              render={() => (
                <span className="location-table-action-icon">
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
    );
};

export default ResponsibilityLocationElement;
