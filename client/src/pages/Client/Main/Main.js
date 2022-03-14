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
import searchCarService from "../../../services/searchCarServices";
/**
 * TODO 1
 * 1. Login show/hide condition user ==> Test
 * 2. validate input required
 * 3. Split Tree by province 
 * 4. Create useBookingContext (location car pickup_date return_date price total_price booking_status booking_no)
 * 5. Create usePaymentContext
 * 6. 4 - 5 will refactor in redux
 */

const { Search } = Input;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const { Item } = Form;

const Main = () => {
  const history = useHistory();
  const [getLocation, setGetLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchLocation = async () => {
    setLoading(true);
    await searchCarService
      .getProvinceAndLocation()
      .then((res) => {
        setGetLocation(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (error || !Array.isArray(getLocation.data)) {
    return <p>There was an error loading your data!</p>;
  }

  const onClickSearchCar = async (values) => {
    console.log(values);
    //console.log(getLocation.data);
    // await getLocation.data.map(v => {
    //   return console.log(v.id);
    // })
    //get data form
    //set state redux global
    //history.push(`/search-car`);
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
                            required: false,
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
                                key={item.id}
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
                        name="range-picker"
                        rules={[
                          {
                            type: "array",
                            required: false,
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
