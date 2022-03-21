import React, { useState } from "react";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";

import PicturesWall from "../../../components/PicturesWall/PicturesWall";
import "./ManagementCar.scss";
import { Row, Col, Input, Button, Form, Upload, notification } from "antd";
import adminService from "../../../services/adminServices";

const { TextArea } = Input;
const { Item } = Form;

const UpdateCar = () => {


  const dummyImg = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-xxx",
        percent: 50,
        name: "image.png",
        status: "uploading",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      },
    ],
  };
  const [dummyPic, setDummyPic] = useState(dummyImg);

  const onLocationImageChange = (imageList) => {
    console.log("locationImage");
  };

  const onSubmitImport = async (values) => {
    console.log(values);
    //send Data to API

  };

  return (
    <div className="car">
      <Form name="import_car" onFinish={onSubmitImport}>
        <Row>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <b>ข้อมูลรถ</b>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>รถยี่ห้อ/รุ่น</label>
            <Item name="car_brand" >
              <Input size="large" />
            </Item>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>ประเภทรถ</label>
            <Item name="car_type">
              <Input size="large" />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>จำนวนที่นั่ง</label>
            <Item name="car_seat">
              <Input size="large" />
            </Item>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>ประเภทเกียร์</label>
            <Item name="car_transmission">
              <Input size="large" />
            </Item>
          </Col>
        </Row>
        <Row>
        <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
          <label>ปีที่จดทะเบียนรถ</label>
            <Item name="car_register">
              <Input size="large" />
            </Item>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
          <label>ราคาเช่าต่อวัน</label>
            <Item name="car_price">
              <Input size="large" />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 16 }}>
            <label>รูปถ่ายภาพรถ</label>
            <div style={{ marginTop: "10px" }}>
            <Item name="files">
              <PicturesWall onChange={onLocationImageChange} filesImg={dummyPic} />
            </Item>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Item>
              <Button type="primary" htmlType="submit">
                นำเข้าข้อมูลรถ
              </Button>
            </Item>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Link to="/management/edit-car">
            <Button id="btn-del">
              แก้ไขข้อมูลรถ
            </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default withRouter(UpdateCar);
