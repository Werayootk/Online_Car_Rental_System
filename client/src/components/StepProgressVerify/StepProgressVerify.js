import React from 'react';
import './StepProgressVerify.scss';
import { Steps } from "antd";

const { Step } = Steps;

const StepProgressVerify = (props) => {
    return (
        <Steps direction="vertical" current={1} size="small">
        <Step title="Finished" description="ทำการจอง" />
        <Step title="In Progress" description="รอชำระเงิน" />
        <Step title="Waiting" description="รอตรวจสอบ" />
        <Step title="Waiting" description="รอรับรถ" />
        <Step title="Waiting" description="คืนรถ" />
      </Steps>
    );
};

export default StepProgressVerify;