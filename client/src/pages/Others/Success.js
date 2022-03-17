import React from "react";
import "./SuccessDisplay.scss";
import { CheckCircleTwoTone } from '@ant-design/icons';

const SuccessDisplay = (props) => {
  return (
    <div className="body_success">
      <div className="card">
        <CheckCircleTwoTone size={400}/>
        <h1>Success</h1>
        <p>
          การจองของคุณได้ถูกสร้างขึ้นสำเร็จแล้ว;
          <br /> หมายเลขการจอง XXX!
        </p>
      </div>
    </div>
  );
};

export default SuccessDisplay;
