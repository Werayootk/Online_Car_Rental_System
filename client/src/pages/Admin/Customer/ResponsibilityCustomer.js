import React, { useState, useEffect } from "react";
import './Customer.scss';
import { Col, Row, Modal, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import SearchFilterCustomer from './SearchFilterCustomer';
import Table from "../../../components/Table/Table";
import ModalCustomer from './ModalCustomer'
import { CUSTOMER_FILTER_OPTIONS } from '../../../config/filter';
import adminService from '../../../services/adminServices';
import { index } from "cheerio/lib/api/traversing";

const { Column } = Table

const ResponsibilityElement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterOption, setFilterOption] = useState();
  const [searchInput, setSearchInput] = useState();
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [dataModal, setDataModal] = useState();

  const filterOptions = [...CUSTOMER_FILTER_OPTIONS];
  
  const fetchDataCustomer = async () => {
    setTableLoading(true)
    let param = `?offset=${(currentPage - 1) * pageSize}`;
    if (filterOption && searchInput) {
      param += `&${filterOption}=${searchInput}`
    }
    console.log(param);
    await adminService.getCustomerAll(param).then(res => {
      setDataSource(res.data.data.map((item, index) => {
        return {
          ...item,
          key: index,
          first_name: item.first_name,
          last_name: item.last_name,
          phone_number: item.phone_number,
          email: item.email,
          id: item.id
        }
      }));
      setTotal(res.data.total);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setTableLoading(false);
    });
  };

  useEffect(() => {
    console.log(filterOption, searchInput, currentPage);
    fetchDataCustomer();
  },[filterOption, searchInput, currentPage])

    return (
        <Row>
        <Col span={24}>
          <SearchFilterCustomer
            filters={{ options: filterOptions, defaultValue: 'ชื่อ' }}
            onFilterChange={setFilterOption}
            onSearch={setSearchInput}
          />
        </Col>
        <Col className="customer-table-container" span={24}>
          <Table
            pagination={{
              current: currentPage,
              total: total,
              pageSize: pageSize,
              totalPage: total / pageSize,
              onChange: setCurrentPage
            }}
            loading={tableLoading}
            dataSource={dataSource}
          >
            {/* <Column
              key="index"
              dataIndex="key"
              title="No."
            /> */}
            <Column
              key="first_name"
              dataIndex="first_name"
              title="First Name"
            />
            <Column
              key="last_name"
              dataIndex="last_name"
              title="Last Name"
            />
            <Column
              key="phone_number"
              dataIndex="phone_number"
              title="Tel"
            />
           <Column
              key="email"
              dataIndex="email"
              title="Email"
            />
           <Column
              key="id"
              dataIndex="id"
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
