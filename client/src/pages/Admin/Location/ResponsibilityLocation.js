import React, { useState, useEffect } from "react";
import './Location.scss';
import { Col, Row, Modal, Button, Form, Input, notification, Select } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchFilterLocation from './SearchFilterLocation';
import Table from "../../../components/Table/Table";

import { LOCATION_FILTER_OPTIONS } from '../../../config/filter';
import adminService from "../../../services/adminServices";

const { Column } = Table
const { Item } = Form;
const { Option } = Select;

const ResponsibilityLocationElement = (props) => {
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
  const [dataLocation, setDataLocation] = useState();

  const filterOptions = [...LOCATION_FILTER_OPTIONS];
  const isModalVisible = !!dataModal;

  const onClickEditLocation = (data, index) => {
    setDataModal(data);
  };

  const onClickDeleteLocation = async (data, index) => {
    console.log(data);
    setTableLoading(true);
    await adminService.deleteLocationById(data.id).then(res => {
      setDataLocation(res.data);
      notification.success({
        message: res.data.message
      })
    }).catch(err => {
      console.error(err);
    }).finally(() => { 
      setTableLoading(false);
    })
  };

  const fetchDataLocation = async () => {
    setTableLoading(true);
    let param = `?offset=${(currentPage - 1) * pageSize}`;
    if (filterOption && searchInput) {
      param += `&${filterOption}=${searchInput}`;
    }
    console.log(param);
    await adminService
      .getLocationAll(param)
      .then((res) => {
        setDataSource(
          res.data.data.map((item, index) => {
            return {
              ...item,
              key: index,
              province: item.province,
              location: item.location,
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
    const modifyLocation = {
      province: values.province,
      location: values.location,
    }
    await adminService.updateLocationById(dataModal.id, modifyLocation).then(res => {
      setDataLocation(res.data);
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
    fetchDataLocation();
  }, [filterOption, searchInput, currentPage, dataLocation]);

  return (
      <>    
        <Row>
        <Col span={24}>
          <SearchFilterLocation
            filters={{ options: filterOptions, defaultValue: 'Location' }}
            onFilterChange={setFilterOption}
          />
        </Col>
        <Col className="location-table-container" span={24}>
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
            <Column
              key="id"
              dataIndex="id"
              title="ID"
            />
            <Column
              key="province"
              dataIndex="province"
              title="Province"
            />
            <Column
              key="location"
              dataIndex="location"
              title="Location"
            />
            <Column
              key="action"
              title="ดูรายละเอียด"
              render={(dataSource, index) => (
                <span className="location-table-action-icon"
                onClick={onClickEditLocation.bind(this, dataSource, index)}          
                >
                    <FileTextOutlined className="clickable" />
                </span>
              )}
            />
             <Column
              key="action"
              title="ลบสถานที่"
              render={(dataSource, index) => (
                <span className="location-table-action-icon"
                onClick={onClickDeleteLocation.bind(this, dataSource, index)}          
                >
                    <DeleteOutlineIcon className="clickable" />
                </span>
              )}
            />
          </Table>
        </Col>
      </Row>
      <Modal
        className="location-modal-title"
        title="รายละเอียดสถานที่"
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
            name="province"
            label="จังหวัด"
            rules={[{ required: true, message: "Please input your province!" }]}
          >
                         <Select
                showSearch
                placeholder="Select a province"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                size="large"
                >
                <Option value="" selected>--------- เลือกจังหวัด ---------</Option>
                <Option value="กรุงเทพมหานคร">กรุงเทพมหานคร</Option>
                <Option value="กระบี่">กระบี่ </Option>
                <Option value="กาญจนบุรี">กาญจนบุรี </Option>
                <Option value="กาฬสินธุ์">กาฬสินธุ์ </Option>
                <Option value="กำแพงเพชร">กำแพงเพชร </Option>
                <Option value="ขอนแก่น">ขอนแก่น</Option>
                <Option value="จันทบุรี">จันทบุรี</Option>
                <Option value="ฉะเชิงเทรา">ฉะเชิงเทรา </Option>
                <Option value="ชัยนาท">ชัยนาท </Option>
                <Option value="ชัยภูมิ">ชัยภูมิ </Option>
                <Option value="ชุมพร">ชุมพร </Option>
                <Option value="ชลบุรี">ชลบุรี </Option>
                <Option value="เชียงใหม่">เชียงใหม่ </Option>
                <Option value="เชียงราย">เชียงราย </Option>
                <Option value="ตรัง">ตรัง </Option>
                <Option value="ตราด">ตราด </Option>
                <Option value="ตาก">ตาก </Option>
                <Option value="นครนายก">นครนายก </Option>
                <Option value="นครปฐม">นครปฐม </Option>
                <Option value="นครพนม">นครพนม </Option>
                <Option value="นครราชสีมา">นครราชสีมา </Option>
                <Option value="นครศรีธรรมราช">นครศรีธรรมราช </Option>
                <Option value="นครสวรรค์">นครสวรรค์ </Option>
                <Option value="นราธิวาส">นราธิวาส </Option>
                <Option value="น่าน">น่าน </Option>
                <Option value="นนทบุรี">นนทบุรี </Option>
                <Option value="บึงกาฬ">บึงกาฬ</Option>
                <Option value="บุรีรัมย์">บุรีรัมย์</Option>
                <Option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์ </Option>
                <Option value="ปทุมธานี">ปทุมธานี </Option>
                <Option value="ปราจีนบุรี">ปราจีนบุรี </Option>
                <Option value="ปัตตานี">ปัตตานี </Option>
                <Option value="พะเยา">พะเยา </Option>
                <Option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา </Option>
                <Option value="พังงา">พังงา </Option>
                <Option value="พิจิตร">พิจิตร </Option>
                <Option value="พิษณุโลก">พิษณุโลก </Option>
                <Option value="เพชรบุรี">เพชรบุรี </Option>
                <Option value="เพชรบูรณ์">เพชรบูรณ์ </Option>
                <Option value="แพร่">แพร่ </Option>
                <Option value="พัทลุง">พัทลุง </Option>
                <Option value="ภูเก็ต">ภูเก็ต </Option>
                <Option value="มหาสารคาม">มหาสารคาม </Option>
                <Option value="มุกดาหาร">มุกดาหาร </Option>
                <Option value="แม่ฮ่องสอน">แม่ฮ่องสอน </Option>
                <Option value="ยโสธร">ยโสธร </Option>
                <Option value="ยะลา">ยะลา </Option>
                <Option value="ร้อยเอ็ด">ร้อยเอ็ด </Option>
                <Option value="ระนอง">ระนอง </Option>
                <Option value="ระยอง">ระยอง </Option>
                <Option value="ราชบุรี">ราชบุรี</Option>
                <Option value="ลพบุรี">ลพบุรี </Option>
                <Option value="ลำปาง">ลำปาง </Option>
                <Option value="ลำพูน">ลำพูน </Option>
                <Option value="เลย">เลย </Option>
                <Option value="ศรีสะเกษ">ศรีสะเกษ</Option>
                <Option value="สกลนคร">สกลนคร</Option>
                <Option value="สงขลา">สงขลา </Option>
                <Option value="สมุทรสาคร">สมุทรสาคร </Option>
                <Option value="สมุทรปราการ">สมุทรปราการ </Option>
                <Option value="สมุทรสงคราม">สมุทรสงคราม </Option>
                <Option value="สระแก้ว">สระแก้ว </Option>
                <Option value="สระบุรี">สระบุรี </Option>
                <Option value="สิงห์บุรี">สิงห์บุรี </Option>
                <Option value="สุโขทัย">สุโขทัย </Option>
                <Option value="สุพรรณบุรี">สุพรรณบุรี </Option>
                <Option value="สุราษฎร์ธานี">สุราษฎร์ธานี </Option>
                <Option value="สุรินทร์">สุรินทร์ </Option>
                <Option value="สตูล">สตูล </Option>
                <Option value="หนองคาย">หนองคาย </Option>
                <Option value="หนองบัวลำภู">หนองบัวลำภู </Option>
                <Option value="อำนาจเจริญ">อำนาจเจริญ </Option>
                <Option value="อุดรธานี">อุดรธานี </Option>
                <Option value="อุตรดิตถ์">อุตรดิตถ์ </Option>
                <Option value="อุทัยธานี">อุทัยธานี </Option>
                <Option value="อุบลราชธานี">อุบลราชธานี</Option>
                <Option value="อ่างทอง">อ่างทอง </Option>
              </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="สถานที่"
            rules={[{ required: true, message: "Please input your location!" }]}
          >
            <Input placeholder={"ใส่สถานที่"}/>
          </Form.Item>
        </Form>
      </Modal>
      </>
    );
};

export default ResponsibilityLocationElement;
