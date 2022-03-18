import React from "react";
import "./ModalPayment.scss";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Modal } from "antd";

const ModalPayment = (props) => {
  return (
    <Modal
      centered
      visible={props.ispaymentShow}
      footer={null}
      bodyStyle={{ height: "60vh" }}
      width="90vw"
      onCancel={() => false}
      style={{ textAlign: "center" }}
    >
      <div className="body_payment">
        <div className="card">
          <CheckCircleTwoTone size={400} />
          <h1>Payment Success</h1>
          <p>
            ได้รับการชำระเงินแล้ว;
            <br /> หมายเลขการจอง {props.bookingNumber}!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPayment;
