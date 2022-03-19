import React from "react";
import "./PaymentMessage.scss";
import { CheckCircleTwoTone } from '@ant-design/icons';

const PaymentMessage = (props) => {
  return (
    <div className="body_payment">
      <div className="card">
        <CheckCircleTwoTone style={{ fontSize: '50px', color: '#08c' }} />
        <h1>Payment Success</h1>
        <p>
           ได้รับการชำระเงินแล้ว;
          <br /> ขอบคุณที่ใช้บริการ
        </p>
      </div>
    </div>
  );
};

export default PaymentMessage;
