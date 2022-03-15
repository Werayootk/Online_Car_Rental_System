import React, { useState, useEffect, useRef } from "react";
import "./Booking.scss";
import CardCarCategory from "../../../components/CardCarCategory/CardCarCategory";
import CardCarDetail from "../../../components/CardCarDetail/CardCarDetail";
import { CarType } from "../../../config/car_type";
import searchCarService from "../../../services/searchCarServices";
import axios from '../../../config/axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

/** TODO 8
 * 1. axios data car availiable to setState send to Card
 * 2. implement infinity scroll down fetch data
 * 3. implement filter and sort
 * 3. redux save state car
 * 4. click car detail to redirect save state car detail
 */

const Booking = () => {
  const [carType, setCarType] = useState(CarType);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isActiveClear, setActiveClear] = useState(false);
  const [isActiveSortPrice, setActiveSortPrice] = useState(false);
  const [valCarCategory, setValCarCategory] = useState();
  const [valSortPrice, setValSortPrice] = useState("asc");
  const [getCarData, setGetCarData] = useState();
  const [loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const fetchCarAvailable = async (params) => {
    await searchCarService
      .getCarListAll(params)
      .then((res) => {
        //if (componentMounted.current) {
          setGetCarData(res.data);
        //}
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    // const response = await axios.get('/search-car/car-list', params);
    // setGetCarData(response.data);
    // setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const params = valCarCategory ? valCarCategory : ""
    fetchCarAvailable(params);
    console.log("Effect fetch data");
  },[])

  useEffect(() => {
    //params logic ?car_type sort_price offset=0 limit=4
      setLoading(true);
      const carType = valCarCategory ? valCarCategory.toString() : "";
      const params = `?car_type=${carType}&sort_price=${valSortPrice}`;
      fetchCarAvailable(params);
      history.push(`${location.pathname}${params}`);
      console.log("Effect fetch data have params: "+`${location.pathname}${params}`);  
    // return () => {
    //   componentMounted.current = false;
    // }
  }, [valSortPrice, valCarCategory]);

  return (
    <div className="search-container container">
      <div className="row">
        <div
          className="col-lg-4"
          style={{ position: "relative", marginBottom: "15px" }}
        >
          <div className="filter-section">
            <div className="filter__header">
              <p>ฟิลเตอร์</p>
              <span
                className="clean-btn"
                onClick={() => setActiveClear(!isActiveClear)}
              >
                ล้างค่าทั้งหมด
              </span>
            </div>
            <div className="filter__tab ">
              <div className="tab-header">
                <p className="tab-title">ขนาดรถ</p>
              </div>
              <div className="tab-content">
                <div className="filter-category">
                  <div className="category-item d-inline-flex flex-row flex-wrap">
                    <CardCarCategory
                      items={carType}
                      sendClear={isActiveClear}
                      onChange={(val) => {
                        setValCarCategory(val);
                        console.log(val);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="filter-bar">
            <div className="car-summary">
              พบรถว่าง {getCarData?.total.toString()} คัน จากที่ตรงกับตัวกรองของคุณ{" "}
              <span
                className="clean-btn"
                onClick={() => setActiveClear(!isActiveClear)}
              >
                ล้างค่าทั้งหมด
              </span>
            </div>
            <div className="filter-badge"></div>
            <div className="filter-sort">
              <div className="sort-item sort-item--title">เรียงโดย</div>
              <div
                className={isActiveSortPrice ? `sort-item active` : `sort-item`}
                onClick={() => {
                  setActiveSortPrice(!isActiveSortPrice);
                  setValSortPrice("desc");
                  console.log(valSortPrice);
                }}
              >
                ราคารวม (จากสูงสุดก่อน)
              </div>
              <div
                className={
                  !isActiveSortPrice ? `sort-item active` : `sort-item`
                }
                onClick={() => {
                  setActiveSortPrice(!isActiveSortPrice);
                  setValSortPrice("asc");
                  console.log(valSortPrice);
                }}
              >
                ราคารวม (จากต่ำสุดก่อน)
              </div>
            </div>
          </div>
          <div className="row car-listing">
            <div></div>
            { !loading && <CardCarDetail items={getCarData} />}
            { loading && <div className="spin-position"><Spin size="large"/></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
