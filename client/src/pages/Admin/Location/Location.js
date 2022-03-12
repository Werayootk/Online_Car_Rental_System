import React from "react";
import "./Location.scss";
import { Input, Select, Button, Row, Col } from "antd";

import ResponsibilityLocation from "./ResponsibilityLocation";

/**TODO 16
 * 0. form input antd validate
 * 1. sync datasoucre
 * 2. axios create locaction
 * 3. axios filter paginate
 */
const { Option } = Select;

const InputLocation = (props) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (val) => {
    console.log("search:", val);
  };

  const onSubmit = () => {
    console.log("Click");
  };

  return (
      <div id="input-box">
      <div className="content"> 
      <Row align="middle">
        <Col span={9}>
          <Select
            showSearch
            placeholder="Select a province"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            size="large"
          >
            <Option value="nonthaburi">นนทบุรี</Option>
            <Option value="bangkok">กรุงเทพ</Option>
            <Option value="loei">เลย</Option>
          </Select>
        </Col>
        <Col span={9}>
          <Input placeholder="ใส่สถานที่" size="large"/>
        </Col>
        <Col span={6}>
          <Button onClick={onSubmit}>นำเข้าสถานที่</Button>
        </Col>
      </Row>
          </div>
    </div>
  );
};

const TableLocation = (props) => {
  return (
    <div className="customer-container">
      <Row>
        <Col span={20} style={{ paddingLeft: 22 }}>
          <ResponsibilityLocation
            dataSource={null}
            pagination={{
              onChange: null,
              total: 50,
              showSizeChanger: false,
            }}
            loading={null}
            currentPagination={1}
            onPagination={null}
          />
        </Col>
      </Row>
    </div>
  );
};

const Location = () => {
  return (
    <div className="location">
      <InputLocation />
      <TableLocation />
    </div>
  );
};

export default Location;
