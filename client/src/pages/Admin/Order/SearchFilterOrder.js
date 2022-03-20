import React from "react";
import styled from "styled-components";
import { Col, Row, Input, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import _debounce from 'lodash/debounce';

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
  const { filters, onFilterChange, onSearch } = props;

  const handleFilterChange = (value) => {
    onFilterChange(value);
  };
  
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

const debounceHandleSearchChange = _debounce(handleSearchChange, 1000, {
  maxWait: 3000,
  trailing: true
});

  return (
    <SearchFilterLayout>
      <Col span={24}>
        <Row align="middle">
          <Col span={6}>
            <Space />
          </Col>
          <Col span={14}>ค้นหา</Col>
          <Col span={4}>ฟิลเตอร์</Col>
        </Row>
        <Row align="middle">
          <Col span={17} style={{ paddingRight: 22 }}>
            <SearchInput
              placeholder="กรอกคำค้นหา"
              prefix={<SearchIcon />}
              onChange={debounceHandleSearchChange}
            />
          </Col>
          <Col span={7}>
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
        </Row>
      </Col>
    </SearchFilterLayout>
  );
};

export default SearchFilterOrder;
