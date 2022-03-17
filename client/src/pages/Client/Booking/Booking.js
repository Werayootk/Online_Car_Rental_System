import React, { useState, useEffect, useRef } from "react";
import "./Booking.scss";
import CardCarCategory from "../../../components/CardCarCategory/CardCarCategory";
import CardCarDetail from "../../../components/CardCarDetail/CardCarDetail";
import { CarType } from "../../../config/car_type";
import searchCarService from "../../../services/searchCarServices";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [getCarDataAll, setGetCarDataAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreCar, setHasMoreCar] = useState(true);
  const [offsetData, setOffsetData] = useState(4);

  const fetchCarAvailable = async (params) => {
    await searchCarService
      .getCarListAll(params)
      .then((res) => {
        setGetCarData(res.data);
        setGetCarDataAll(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const carType = valCarCategory ? valCarCategory.toString() : "";
    const params = `?car_type=${carType}&sort_price=${valSortPrice}&offset=0`;
    fetchCarAvailable(params);
    history.push(`${location.pathname}${params}`);
    console.log(
      "Effect fetch data have params: " + `${location.pathname}${params}`
    );
    setHasMoreCar(true);
    setOffsetData(4);
  }, [valSortPrice, valCarCategory]);

  const fetchCar = async () => {
    const car_Type = valCarCategory ? valCarCategory.toString() : "";
    const param = `?car_type=${car_Type}&sort_price=${valSortPrice}&offset=${offsetData}`;
    console.log(`?car_type=${car_Type}&sort_price=${valSortPrice}&offset=${offsetData}`);
    setLoading(true);
    const response = await searchCarService.getCarListAll(param);
    console.log(response.data);
    setLoading(false);
    history.push(`${location.pathname}${param}`);
    return response.data.data;
  }

  const fetchMoreCar = async () => {
    const carFromServer = await fetchCar();
    setGetCarDataAll([...getCarDataAll, ...carFromServer]);
    if (carFromServer.length === 0 || carFromServer.length < 4) {
      setHasMoreCar(false);
      console.log(carFromServer);
    }
    setOffsetData(offsetData + 4);
  };

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
                      carCategory={carType}
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
              พบรถว่าง {getCarData?.total} คัน
              จากที่ตรงกับตัวกรองของคุณ{" "}
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
            {!loading && 
            <InfiniteScroll
              style={{ overflowY: 'hidden' }}
              dataLength={getCarData.total}
              next={fetchMoreCar}
              hasMore={hasMoreCar}
              loader={<Spin size="large" className="spin-position" />}
              endMessage={"ไม่พบข้อมูลแล้ว"}
            >
              <CardCarDetail items={getCarDataAll} />
              </InfiniteScroll>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
