import React, { useState, useEffect } from "react";
import "./Customer.scss";
import { Col, Row, Modal, Button, Form, Input, notification } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import SearchFilterCustomer from "./SearchFilterCustomer";
import Table from "../../../components/Table/Table";
import { CUSTOMER_FILTER_OPTIONS } from "../../../config/filter";
import adminService from "../../../services/adminServices";

const { Column } = Table;
const { Item } = Form;

const ResponsibilityElement = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterOption, setFilterOption] = useState();
  const [searchInput, setSearchInput] = useState();
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [dataModal, setDataModal] = useState();

  const filterOptions = [...CUSTOMER_FILTER_OPTIONS];
  const isModalVisible = !!dataModal;

  const onClickEditCustomer = (data, index) => {
    setDataModal(data);
  };

  const fetchDataCustomer = async () => {
    setTableLoading(true);
    let param = `?offset=${(currentPage - 1) * pageSize}`;
    if (filterOption && searchInput) {
      param += `&${filterOption}=${searchInput}`;
    }
    console.log(param);
    await adminService
      .getCustomerAll(param)
      .then((res) => {
        setDataSource(
          res.data.data.map((item, index) => {
            return {
              ...item,
              key: index,
              first_name: item.first_name,
              last_name: item.last_name,
              phone_number: item.phone_number,
              email: item.email,
              id: item.id,
            };
          })
        );
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const handleCancel = () => {
    setDataModal(null);
  };

  const onFinish = async (values) => {
    setLoading(true);
    //console.log(values, dataModal);
    const modifyCustomer = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number
    }
    await adminService.updateCustomerById(dataModal.id, modifyCustomer).then(res => {
      notification.success({
        message: res.data.message
      })
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
      setDataModal(null);
    })
  };

  useEffect(() => {
    fetchDataCustomer();
  }, [filterOption, searchInput, currentPage]);

  return (
    <>
      <Row>
        <Col span={24}>
          <SearchFilterCustomer
            filters={{ options: filterOptions, defaultValue: "ชื่อ" }}
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
              onChange: setCurrentPage,
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
            <Column key="last_name" dataIndex="last_name" title="Last Name" />
            <Column key="phone_number" dataIndex="phone_number" title="Tel" />
            <Column key="email" dataIndex="email" title="Email" />
            <Column key="id" dataIndex="id" title="ID" />
            <Column
              key="action"
              title="แก้ไขรายละเอียด"
              render={(dataSource, index) => (
                <span
                  className="customer-table-action-icon"
                  onClick={onClickEditCustomer.bind(this, dataSource, index)}
                >
                  <FileTextOutlined className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
      <Modal
        className="customer-modal-title"
        title="รายละเอียดลูกค้า"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            key="submit"
            loading={loading}
            onClick={form.submit}
          >
            Edit
          </Button>,
        ]}
        destroyOnClose={true}
      >
        <Form
          labelCol={{ xs: { span: 6 } }}
          wrapperCol={{ xs: { span: 12 } }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="first_name"
            label="ชื่อจริง"
            rules={[{ required: true, message: "Please input your First-Name!" }]}
          >
            <Input placeholder={"ชื่อจริง"}/>
          </Form.Item>

          <Form.Item
            name="last_name"
            label="นามสกุล"
            rules={[{ required: true, message: "Please input your Last-Name!" }]}
          >
            <Input placeholder={"นามสกุล"}/>
          </Form.Item>

          <Form.Item
            name="email"
            label="อีเมล"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input placeholder="E-mail"/>
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="หมายเลขโทรศัพทฺ์"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                min: 10,
                message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก",
              },
            ]}
          >
            <Input  placeholder={
                  "กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก"
                }/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResponsibilityElement;
