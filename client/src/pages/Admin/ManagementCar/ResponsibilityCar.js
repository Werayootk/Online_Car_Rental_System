import React from "react";
import './ManagementCar.scss';
import { Col, Row } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterCar from './SearchFilterCar';
import Table from "../../../components/Table/Table";

import { TablePaginationConfig } from 'antd/es/table';
import { ColumnType } from 'antd/es/table';
import { CAR_FILTER_OPTIONS } from '../../../config/filter';

const { Column } = Table;

const ResponsibilityCarElement = (props) => {
    const handleFilterOptionChange = (value) => {
        console.log(value);
    }

    const handleSearchChange = (value) => {
        console.log(value);
    }

    const filterOptions = [{text: 'ทั้งหมด', value: 'ALL'}, ...CAR_FILTER_OPTIONS];

    return (
        <Row>
        <Col span={24}>
          <SearchFilterCar
            filters={{ options: filterOptions, defaultValue: 'ALL' }}
            onFilterChange={handleFilterOptionChange}
          />
        </Col>
        <Col className="car-table-container" span={24}>
          <Table
            pagination={props.pagination}
            loading={props.loading}
          >
            <Column key="No." title="No." />
            <Column
              key="CAR_ID"
              title="CAR_ID"
            />
            <Column
              key="CAR_BRAND"
              title="CAR_BRAND"
            />
            <Column
              key="STATUS"
              title="STATUS"
            />
           <Column
              key="CAR_YEAR"
              title="CAR_YEAR"
            />
           <Column
              key="SEAT"
              title="SEAT"
                    />
                    <Column
              key="CAR_TYPE"
              title="CAR_TYPE"
                    />
                    <Column
              key="GEAR"
              title="GEAR"
            />
            <Column
              key="action"
              title="ดูรายละเอียด"
              render={() => (
                <span className="car-table-action-icon">
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
    );
};

export default ResponsibilityCarElement;