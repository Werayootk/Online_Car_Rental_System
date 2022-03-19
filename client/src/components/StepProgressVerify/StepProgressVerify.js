import React, { useState, useEffect } from "react";
import "./StepProgressVerify.scss";
import { Steps } from "antd";

const { Step } = Steps;
/**
 * ยกเลิก รอตรวจสอบ รอรับรถ คืนรถ
 * Waiting, In Progress, Finished
 */

const StepProgressVerify = (props) => {
  const { booking_status } = props;
  const [cancel, setCancel] = useState(false);
  const [verify, setVerify] = useState(false);
  const [waitingCar, setWaitingCar] = useState(false);
  const [returnCar, setReturnCar] = useState(false);
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    if (booking_status === "ตรวจสอบแล้ว") {
      setCurrent(3);
      setVerify(true);
      setWaitingCar(false);
      setReturnCar(false);
      setCancel(false);
    }
    if (booking_status === "รับรถแล้ว") {
      setCurrent(4);
      setVerify(false);
      setWaitingCar(true);
      setReturnCar(false);
      setCancel(false);
    }
    if (booking_status === "คืนรถแล้ว") {
      setCurrent(5);
      setVerify(false);
      setWaitingCar(false);
      setReturnCar(true);
      setCancel(false);
    }
    if (booking_status === "ยกเลิก") {
      setVerify(false);
      setWaitingCar(false);
      setReturnCar(false);
      setCancel(true);
    }
  }, [booking_status]);

  return (
    <Steps
      direction="vertical"
      current={current}
      onChange={setCurrent}
      size="small"
      status={cancel ? "error" : "process"}
    >
      <Step title="Finished" description="ทำการจอง" />
      <Step title="Finished" description="ชำระเงินแล้ว" />
      <Step title={verify ? "Finished" : waitingCar ? "Finished" : returnCar ? "Finished" : "In Progress"} description="รอตรวจสอบ" />
      <Step title={verify ? "In Progress" : waitingCar ? "Finished" : returnCar ? "Finished" : "In Progress"} description={cancel ? "ยกเลิกการจอง" : "รอรับรถ"} />
      <Step title={verify ? "Waiting" : waitingCar ? "In Progress" : returnCar ? "Finished" : "In Progress"} description="คืนรถ" /> 
    </Steps>
  );
};

export default StepProgressVerify;
