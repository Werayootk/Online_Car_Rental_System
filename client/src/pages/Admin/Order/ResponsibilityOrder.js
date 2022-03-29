import React, { useState, useEffect } from "react";
import "./Order.scss";
import { Col, Row, Modal, Button, Form, Input, notification, Select } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import SearchFilterOrder from "./SearchFilterOrder";
import Table from "../../../components/Table/Table";
import { ORDER_FILTER_OPTIONS } from "../../../config/filter";
import adminService from "../../../services/adminServices";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderData } from "../../../storage/reducers/orderActions";

const { Column } = Table;
const { Item } = Form;
const { Option } = Select;

const ResponsibilityOrderElement = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterOption, setFilterOption] = useState();
  const [searchInput, setSearchInput] = useState();
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [dataModal, setDataModal] = useState();
  const order = useSelector((state) => state.order.orderList);
  const [orderForm, setOrderForm] = useState();
  
  const filterOptions = [...ORDER_FILTER_OPTIONS];
  const isModalVisible = !!dataModal;

  const onClickEditOrder = (data, index) => {
    setDataModal(data);
    initFormField(data);
  };

  const fetchDataOrder = async () => {
    setTableLoading(true);
    let param = `?offset=${(currentPage - 1) * pageSize}`;
    if (filterOption && searchInput) {
      param += `&${filterOption}=${searchInput}`;
    }
    console.log(param);
    await adminService
      .getOrderAll(param)
      .then((res) => {
        setDataSource(
          res.data.data.map((item, index) => {
            return {
              ...item,
              key: index,
              return_location: item.return_location,
              pickup_location: item.pickup_location,
              start_datetime: item.start_datetime,
              end_datetime: item.end_datetime,
              booking_no: item.booking_no,
              refund: item.refund,
              booking_status: item.booking_status,
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
    console.log(values, dataModal);
    const modifyOrder = {
      return_location: values.return_location,
      refund: values.refund,
      booking_status: values.booking_status,
      pickup_location: values.pickup_location,
      booking_no: values.booking_no,
      start_datetime: values.start_datetime,
      end_datetime: values.end_datetime,
    };
    await adminService
      .updateOrderById(dataModal.id, modifyOrder)
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

  const initFormField = (data) => {
    const orderThis = order.orderList.filter(item => item.id === data.id);
    console.log(orderThis);
    setOrderForm([
      { name: ['booking_no'], value: orderThis[0].booking_no },
      { name: ['pickup_location'], value: orderThis[0].pickup_location },
      { name: ['start_datetime'], value: orderThis[0].start_datetime },
      // { name: ['start_datetime'], value: moment(orderThis[0].start_datetime).format("DD-MM-YYYY hh:mm:ss") },
      { name: ['return_location'], value: orderThis[0].return_location },
      { name: ['end_datetime'], value: orderThis[0].end_datetime },
      // { name: ['end_datetime'], value: moment(orderThis[0].end_datetime).format("DD-MM-YYYY hh:mm:ss") },
      { name: ['refund'], value: orderThis[0].refund },
      // { name: ['booking_status'], value: orderThis[0].booking_status },
    ]);
  };

  useEffect(() => {
    fetchDataOrder();
  }, [filterOption, searchInput, currentPage]);

  useEffect(() => {
    dispatch(fetchOrderData(currentPage, pageSize));
  }, [currentPage, pageSize, dispatch]);

  return (
    <>
      <Row>
        <Col span={24}>
          <SearchFilterOrder
            filters={{ options: filterOptions, defaultValue: "หมายเลขออเดอร์" }}
            onFilterChange={setFilterOption}
            onSearch={setSearchInput}
          />
        </Col>
        <Col className="order-table-container" span={24}>
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
            <Column key="id" dataIndex="id" title="ID" />
            <Column
              key="booking_no"
              dataIndex="booking_no"
              title="หมายเลขออเดอร์"
            />
            <Column
              key="pickup_location"
              dataIndex="pickup_location"
              title="สถานที่รับรถ"
            />
            <Column
              key="start_datetime"
              dataIndex="start_datetime"
              title="เวลารับรถ"
              render={(start_datetime) => {
                return (
                  <p>{moment(start_datetime).format("DD-MM-YYYY hh:mm:ss")}</p>
                );
              }}
            />
            <Column
              key="return_location"
              dataIndex="return_location"
              title="สถานที่คืนรถ"
            />
            <Column
              key="end_datetime"
              dataIndex="end_datetime"
              title="เวลาคืนรถ"
              render={(end_datetime) => {
                return (
                  <p>{moment(end_datetime).format("DD-MM-YYYY hh:mm:ss")}</p>
                );
              }}
            />
            <Column key="refund" dataIndex="refund" title="การคืนเงิน" />
            <Column
              key="booking_status"
              dataIndex="booking_status"
              title="สถานะการจอง"
            />
            <Column
              key="action"
              title="แก้ไขรายละเอียด"
              render={(dataSource, index) => (
                <span
                  className="order-table-action-icon"
                  onClick={onClickEditOrder.bind(this, dataSource, index)}
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
          fields={orderForm}
          onFieldsChange={orderForm}
          onFinish={onFinish}
        >
          <Form.Item
            name="booking_no"
            label="หมายเลขออเดอร์"
            rules={[
              { required: true, message: "Please input your booking no!" },
            ]}
          >
            <Input placeholder={"หมายเลขออเดอร์"} />
          </Form.Item>

          <Form.Item
            name="pickup_location"
            label="สถานที่รับรถ"
            rules={[
              { required: true, message: "Please input your pickup location!" },
            ]}
          >
            <Input placeholder={"สถานที่รับรถ"} />
          </Form.Item>

          <Form.Item
            name="start_datetime"
            label="เวลารับรถ"
            rules={[
              { required: true, message: "Please input your start datetime!" },
            ]}
          >
            <Input placeholder={"เวลารับรถ"} />
          </Form.Item>

          <Form.Item
            name="return_location"
            label="สถานที่คืนรถ"
            rules={[
              {
                required: true,
                message: "Please input your return location!",
              },
            ]}
          >
            <Input placeholder={"สถานที่คืนรถ"} />
          </Form.Item>

          <Form.Item
            name="end_datetime"
            label="เวลาคืนรถ"
            rules={[
              { required: false, message: "Please input your end datetime!" },
            ]}
          >
            <Input placeholder={"เวลาคืนรถ"} />
          </Form.Item>

          <Form.Item
            name="refund"
            label="การคืนเงิน"
          >
            <Input placeholder={"การคืนเงิน"} />
          </Form.Item>

          <Form.Item
            name="booking_status"
            label="สถานะการจอง"
            rules={[
              { required: true, message: "Please input your booking status!" },
            ]}
          >
            {/* <Input placeholder={"สถานะการจอง"} /> */}
            <Select
                showSearch
                placeholder="เลือกสถานะการจอง"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                size="large"
            >
                <Option value="" selected>--------- เลือกสถานะการจอง ---------</Option>
                <Option value="ตรวจสอบแล้ว">ตรวจสอบแล้ว </Option>
                <Option value="รับรถแล้ว">รับรถแล้ว</Option>
                <Option value="คืนรถแล้ว">คืนรถแล้ว </Option>
                <Option value="ยกเลิก">ยกเลิก </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResponsibilityOrderElement;
