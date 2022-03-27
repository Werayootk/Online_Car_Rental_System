import React, { useState, useEffect } from "react";
import "./ManagementCar.scss";
import { Col, Row, Modal, Button, Form, Input, notification } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import SearchFilterCar from "./SearchFilterCar";
import Table from "../../../components/Table/Table";
import { CAR_FILTER_OPTIONS } from "../../../config/filter";
import adminService from "../../../services/adminServices";

const { Column } = Table;
const { Item } = Form;

const ResponsibilityCarElement = (props) => {
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

  const filterOptions = [...CAR_FILTER_OPTIONS];
  const isModalVisible = !!dataModal;

  const onClickEditCar = (data, index) => {
    setDataModal(data);
  };

  const fetchDataCar = async () => {
    setTableLoading(true);
    let param = `?offset=${(currentPage - 1) * pageSize}`;
    if (filterOption && searchInput) {
      param += `&${filterOption}=${searchInput}`;
    }
    console.log(param);
    await adminService
      .getCarAll(param)
      .then((res) => {
        setDataSource(
          res.data.data.map((item, index) => {
            return {
              ...item,
              key: index,
              car_brand: item.car_brand,
              car_register: item.car_register,
              car_type: item.car_type,
              car_transmission: item.car_transmission,
              car_seat: item.car_seat,
              car_status: item.car_status,
              car_price: item.car_price,
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
    const modifyCar = {
      car_brand: values.car_brand,
      car_register: values.car_register,
      car_type: values.car_type,
      car_transmission: values.car_transmission,
      car_seat: values.car_seat,
      car_status: values.car_status,
      car_price: values.car_price,
    };
    await adminService
      .updateCarById(dataModal.id, modifyCar)
      .then((res) => {
        notification.success({
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setDataModal(null);
      });
  };

  useEffect(() => {
    fetchDataCar();
  }, [filterOption, searchInput, currentPage]);

  return (
    <>  
    <Row>
      <Col span={24}>
        <SearchFilterCar
          filters={{ options: filterOptions, defaultValue: "ยี่ห้อรถ" }}
          onFilterChange={setFilterOption}
          onSearch={setSearchInput}
        />
      </Col>
      <Col className="car-table-container" span={24}>
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
          {/* <Column key="No." title="No." /> */}
          <Column key="CAR_ID" title="CAR_ID" dataIndex="id"/>
          <Column key="car_brand" title="ยี่ห้อรถ" dataIndex="car_brand"/>
          <Column key="car_status" title="สถานะรถ" dataIndex="car_status"/>
          <Column key="car_register" title="ปีที่จดทะเบียน" dataIndex="car_register"/>
          <Column key="car_seat" title="จำนวนที่นั่ง" dataIndex="car_seat"/>
          <Column key="car_type" title="ประเภทรถ" dataIndex="car_type"/>
          <Column key="car_transmission" title="ประเภทเกียร์" dataIndex="car_transmission"/>
          <Column key="car_price" title="ราคาเช่าต่อวัน" dataIndex="car_price"/>
          <Column
            key="action"
            title="แก้ไขรายละเอียด"
            render={(dataSource, index) => (
              <span className="car-table-action-icon"
              onClick={onClickEditCar.bind(this, dataSource, index)}
              >
                <FileTextOutlined className="clickable" />
              </span>
            )}
          />
        </Table>
      </Col>
      </Row>
         <Modal
        className="car-modal-title"
        title="รายละเอียดรถ"
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
            name="car_brand"
            label="ยี่ห้อรถ"
            rules={[{ required: true, message: "Please input your car brand!" }]}
          >
            <Input placeholder={"ยี่ห้อรถ"}/>
          </Form.Item>

          <Form.Item
            name="car_register"
            label="ปีที่จดทะเบียนรถ"
            rules={[{ required: true, message: "Please input your car register!" }]}
          >
            <Input placeholder={"ปีที่จดทะเบียนรถ"}/>
          </Form.Item>

          <Form.Item
            name="car_type"
            label="ประเภทรถ"
            rules={[{ required: true, message: "Please input your car type!" }]}
          >
            <Input placeholder={"ประเภทรถ"}/>
          </Form.Item>

          <Form.Item
            name="car_transmission"
            label="ประเภทเกียร์"
            rules={[{ required: true, message: "Please input your car transmission!" }]}
          >
            <Input placeholder={"ประเภทเกียร์"}/>
          </Form.Item>

          <Form.Item
            name="car_seat"
            label="จำนวนที่นั่ง"
            rules={[{ required: true, message: "Please input your car seat!" }]}
          >
            <Input placeholder={"จำนวนที่นั่ง"}/>
          </Form.Item>

          <Form.Item
            name="car_status"
            label="สถานะรถ"
            rules={[{ required: true, message: "Please input your car status!" }]}
          >
            <Input placeholder={"สถานะรถ"}/>
          </Form.Item>

          <Form.Item
            name="car_price"
            label="ราคาเช่าต่อวัน"
            rules={[{ required: true, message: "Please input your car price!" }]}
          >
            <Input placeholder={"ราคาเช่าต่อวัน"}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResponsibilityCarElement;
