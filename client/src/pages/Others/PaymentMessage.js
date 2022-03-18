import React from "react";
import "./PaymentMessage.scss";
import { CheckCircleTwoTone } from '@ant-design/icons';

const PaymentMessage = (props) => {
  return (
    <div className="body_payment">
      <div className="card">
        <CheckCircleTwoTone size={400}/>
        <h1>Payment Success</h1>
        <p>
           ได้รับการชำระเงินแล้ว;
          <br /> หมายเลขการจอง XXX!
        </p>
      </div>
    </div>
  );
};

export default PaymentMessage;
