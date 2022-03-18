import React from "react";
import "./ModalBooking.scss";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Modal } from "antd";

const ModalBooking = (props) => {
  return (
    <Modal
      centered
      visible={props.isBookingShow}
      footer={null}
      bodyStyle={{ height: "60vh" }}
      width="90vw"
      onCancel={() => false}
      style={{ textAlign: "center" }}
    >
      <div className="body_success">
        <div className="card">
          <CheckCircleTwoTone size={400} />
          <h1>Create Booking Success</h1>
          <p>
            การจองของคุณได้ถูกสร้างขึ้นสำเร็จแล้ว;
            <br /> หมายเลขการจอง {props.bookingNumber}!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBooking;
