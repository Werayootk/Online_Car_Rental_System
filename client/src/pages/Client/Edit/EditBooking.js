import React from "react";
import "./EditBooking.scss";
import { ReactComponent as Empty_Book } from "../../../assets/images/empty-booking.svg";
import CardCarBooking from '../../../components/CardCarBooking/CardCarBooking';
import { Select } from "antd";

const { Option } = Select;

const EditBooking = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="editbook">
      <div className="booking">
        <h2>การเช่ารถของฉัน</h2>
        <Select
          defaultValue="pending_verify"
          style={{ width: 360 }}
          onChange={handleChange}
        >
          <Option value="pending_verify">รอตรวจสอบ</Option>
          <Option value="waiting_car">รอรับรถ</Option>
          <Option value="done_booking">การเช่าเสร็จสิ้น</Option>
          <Option value="cancel_booking">ยกเลิกแล้ว</Option>
              </Select>
              <div className="booking__list">
                  {/* <div className="booking-empty font-weight-bold">
                    <Empty_Book />
                  คุณยังไม่มีการเช่าที่รอรอตรวจสอบ
                  </div> */}
                <CardCarBooking items={null} />
              </div>
      </div>
    </div>
  );
};

export default EditBooking;
