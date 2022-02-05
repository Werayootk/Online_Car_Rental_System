import React from "react";
import "./Main.scss";
import { Menu, Dropdown, Input, DatePicker, Button } from "antd";
import "antd/dist/antd.min.css";
import { useHistory } from "react-router-dom";

const { Search } = Input;
const { RangePicker } = DatePicker;
const onSearch = (value) => console.log(value);


const Main = () => {
  const history = useHistory();
  const routeChange = () => {
    let path = `/search-car`;
    history.push(path);
  }
  return (
    <>
      <section className="mainSection">
        <section className="mainSectionBG">
          <section className="main__banner_container">
            <div className="main__Overlay"></div>
            <div className="main__content_section">
              <div className="main__heading_text">
                <h1 className="main__heading_text_h1">
                  ค้นหารถเช่าราคาถูกที่สุด
                </h1>
                <h4 className="main__heading_text_h4">
                  ใช้บริการรถเช่าทั่วประเทศ
                </h4>
              </div>
              <div className="main__search_box">
                <div className="main__search_box_container">
                  <div className="main_search_car">
                    {/*Input Component serach car*/}
                    <Search
                      placeholder="ค้นหาสถานที่รับรถ"
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch}
                    />
                  </div>
                  <div className="main_search_date">
                    {/*Input Component calandar */}
                    <RangePicker showTime size={"large"}
                      placeholder={["วันที่และเวลารับรถ","วันที่และเวลาคืนรถ"]}
                    />
                  </div>
                  <div className="main_search_button">
                    {/*Input Component Button submit */}
                    <Button type="primary" block
                    onClick={routeChange}
                    >
                      ค้นหารถว่าง
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default Main;
