import React from "react";
import styled from "styled-components";
import { Col, Row, Input, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CheckBox from "../../../components/CheckBox/CheckBox";
import { ORDER_STATUS } from "../../../config/checkbox";

const SearchFilterLayout = styled(Row)`
  height: 80px;
`;

const SearchFilterLabel = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #2b3e92;
`;

const SearchInput = styled(Input)`
  height: 56px;
  border-radius: 4px;

  .ant-input-prefix {
    margin-right: 8px;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 20px;
`;

const SelectFilter = styled(Select)`
  width: 100%;

  & > .ant-select-selector {
    height: 56px !important;
    border-radius: 4px !important;
  }
  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

const SearchFilterOrder = (props) => {
  const { filters, onFilterChange } = props;

  const handleFilterChange = (value) => {
    console.log(value);
  };

  const handleSearchChange = (e) => {
    props.onSearch?.(e.target.value);
  };

  const onChangeCheckBox = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  return (
    <SearchFilterLayout>
      <Col span={24}>
        <Row align="middle">
          <Col span={2}>
            <Space />
          </Col>
          <Col span={13}>ค้นหา</Col>
          <Col span={4}>ฟิลเตอร์</Col>
          <Col spam={5}>Status</Col>
        </Row>
        <Row align="middle">
          <Col span={14} style={{ paddingRight: 16 }}>
            <SearchInput
              placeholder="กรอกคำค้นหา"
              prefix={<SearchIcon />}
              onChange={handleSearchChange}
            />
          </Col>
          <Col span={4}>
            <SelectFilter
              defaultValue={filters?.defaultValue}
              onChange={handleFilterChange}
              style={{ marginTop: 2 }}
            >
              {filters?.options?.map((option, index) => (
                <SelectFilter.Option
                  key={option.value + index}
                  value={option.value}
                >
                  {option.text}
                </SelectFilter.Option>
              ))}
            </SelectFilter>
          </Col>
          <Col span={6} style={{ paddingLeft: 12 }}>
            <CheckBox options={ORDER_STATUS} onChange={onChangeCheckBox} />
          </Col>
        </Row>
      </Col>
    </SearchFilterLayout>
  );
};

export default SearchFilterOrder;
