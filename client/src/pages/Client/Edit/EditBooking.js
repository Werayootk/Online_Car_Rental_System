import React, { useState, useEffect } from "react";
import "./EditBooking.scss";
import { ReactComponent as Empty_Book } from "../../../assets/images/empty-booking.svg";
import CardCarBooking from "../../../components/CardCarBooking/CardCarBooking";
import { Select, Pagination, Spin } from "antd";
import myBookingService from "../../../services/myBookingServices";
import mappingBookingStatus from "../../../util/mappingBookingStatus";

const { Option } = Select;

const EditBooking = () => {
  const [selectOption, setSelectOption] = useState("ชำระเงินแล้ว");
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBooking, setNoBooking] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const getMoreBookingList = async () => {
    const pageCurrent = Number(currentPage - 1);
    const params = `?booking_status=${selectOption}&offset=${pageCurrent*pageSize}`;
    setLoading(true);
    setNoBooking(false);
    await myBookingService
      .getBookingList(params)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        setBookingList(res.data.data);
        setTotal(res.data.total);
        const { total } = res.data;
        console.log(total);
        if (total === 0) {
          setNoBooking(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMoreBookingList();
  },[currentPage, selectOption])

  return (
    <div className="editbook">
      <div className="booking">
        <h2>การเช่ารถของฉัน</h2>
        <Select
          defaultValue={"ชำระเงินแล้ว"}
          style={{ width: 360 }}
          onChange={setSelectOption}
        >
          <Option value={"ชำระเงินแล้ว"}>รอตรวจสอบ</Option>
          <Option value={"ตรวจสอบแล้ว"}>รอรับรถ</Option>
          <Option value={"คืนรถแล้ว"}>การเช่าเสร็จสิ้น</Option>
          <Option value={"ยกเลิก"}>ยกเลิกแล้ว</Option>
        </Select>
        <div className="booking__list">
          {noBooking && (
            <div className="booking-empty font-weight-bold">
              <Empty_Book />
              คุณยังไม่มีการเช่าที่{mappingBookingStatus(selectOption)}
            </div>
          )}
          <CardCarBooking booking={bookingList} />
          {/* {!noBooking && <CardCarBooking booking={bookingList} />} */}
          {/* {loading && <Spin size="large"/>} */}
        </div>
      </div>
      <div className="editbook_paginate">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          totalPage={total / pageSize}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EditBooking;
