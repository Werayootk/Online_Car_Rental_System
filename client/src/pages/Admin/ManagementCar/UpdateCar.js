import React, { useState } from 'react';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';

import PicturesWall from "../../../components/PicturesWall/PicturesWall";
import "./ManagementCar.scss";
import { Row, Col, Input, Button, Form, Upload } from "antd";

const { TextArea } = Input;
const { Item } = Form;

const UpdateCar = (props) => {
    const carInfo = {
        brand: "",
        typeOfCar: "",
        seat: 2,
        transmission: "",
      };
    
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
      const [carInput, setCarInput] = useState(carInfo);
      const [dummyPic, setDummyPic] = useState(dummyImg);
    
      const onLocationImageChange = (imageList) => {
        // const locationImage = imageList.map((x) => x.url);
        console.log("locationImage");
      };
    
      const onSubmitImport = () => {
        console.log("import car");
      };
    
      const onSubmitedit = () => {
        props.history.push(`/management/edit-car`);
  };
  
    return (
        <div className="car">
        <Row>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <b>ข้อมูลรถ</b>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>รถยี่ห้อ/รุ่น</label>
            <Input
              size="large"
              value={carInput.brand}
              onChange={(e) =>
                setCarInput({ ...carInput, brand: e.target.value })
              }
            />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>ประเภทรถ</label>
            <Input
              size="large"
              value={carInput.typeOfCar}
              onChange={(e) =>
                setCarInput({ ...carInput, typeOfCar: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>จำนวนที่นั่ง</label>
            <Input
              size="large"
              value={carInput.seat}
              onChange={(e) => {
                setCarInput({ ...carInput, seat: e.target.value });
              }}
            />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <label>ประเภทเกียร์</label>
            <Input
              size="large"
              value={carInput.transmission}
              onChange={(e) =>
                setCarInput({ ...carInput, transmission: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 16 }}>
            <label>รูปถ่ายภาพรถ</label>
            <div style={{ marginTop: "10px" }}>
              <PicturesWall onChange={onLocationImageChange} items={dummyPic} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Button onClick={onSubmitImport}>นำเข้าข้อมูลรถ</Button>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
          <Button id="btn-del" onClick={onSubmitedit}>
              แก้ไขข้อมูลรถ
          </Button>
          </Col>
        </Row>
      </div>
    );
};

export default withRouter(UpdateCar);