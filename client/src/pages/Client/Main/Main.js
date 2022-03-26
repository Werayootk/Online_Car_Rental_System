import React, { useState, useEffect } from "react";
import "./Main.scss";
import {
  Menu,
  Dropdown,
  Input,
  DatePicker,
  Button,
  Form,
  TreeSelect,
  Spin,
} from "antd";
import "antd/dist/antd.min.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { bookingActions } from "../../../storage/reducers/bookingSlice";
import searchCarService from "../../../services/searchCarServices";

const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const { Item } = Form;

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [getLocation, setGetLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    await searchCarService
      .getProvinceAndLocation()
      .then((res) => {
        setGetLocation(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const onClickSearchCar = async (values) => {
    const findLocationId = getLocation.data?.filter(item => item.location === values.location);
    const resultLocationId = findLocationId[0].id ? findLocationId[0].id : null;
    const diff_of_days = Math.floor((values.range_picker[1] - values.range_picker[0]) / ((1000 * 3600 * 24)));
    dispatch(
      bookingActions.addToBookingList({
        carId: null,
        locationId: resultLocationId,
        car: null,
        location: values.location,
        pickup_date: values.range_picker[0],
        return_date: values.range_picker[1],
        diff_days:diff_of_days,
        car_price: null,
        total_price: null
      })
    );
    history.push(`/search-car`);
  };
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
              <Form name="searchCar" onFinish={onClickSearchCar}>
                <div className="main__search_box">
                  <div className="main__search_box_container">
                    <div className="main_search_car">
                      <Item
                        name="location"
                        rules={[
                          {
                            required: true,
                            message: "โปรดเลือกสถานที่",
                          },
                        ]}
                        
                      >
                        <TreeSelect
                          style={{
                            width: 418,
                          }}
                          placeholder="ค้นหารถเช่าที่ว่าง"
                          key="tree_main"
                        >
                          {getLocation.data?.map((item) => {
                            return (
                                <TreeNode
                                key={item.id+uuidv4()}
                                title={item.location}
                                value={item.location}
                              >
                              </TreeNode>
                            )
                          })}
                        </TreeSelect>
                      </Item>
                    </div>
                    <div className="main_search_date">
                      <Item
                        name="range_picker"
                        rules={[
                          {
                            type: "array",
                            required: true,
                            message: "Please select time!",
                          },
                        ]}
                      >
                        <RangePicker
                          showTime
                          size={"large"}
                          placeholder={[
                            "วันที่และเวลารับรถ",
                            "วันที่และเวลาคืนรถ",
                          ]}
                        />
                      </Item>
                    </div>
                    <div className="main_search_button">
                      <Item>
                        <Button type="primary" block htmlType="submit">
                          ค้นหารถว่าง
                        </Button>
                      </Item>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default Main;
