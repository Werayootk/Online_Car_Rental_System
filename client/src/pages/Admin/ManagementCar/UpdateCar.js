import React, { useState } from 'react';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';

import PicturesWall from "../../../components/PicturesWall/PicturesWall";
import "./ManagementCar.scss";
import { Avatar, Row, Col, Input, Button } from "antd";

const { TextArea } = Input;


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
    
      const onSubmitDelete = () => {
        console.log("del car");
        props.history.push(`/management/delete-car`);
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
          <Button id="btn-del" onClick={onSubmitDelete}>
              ลบข้อมูลรถ
          </Button>
          </Col>
        </Row>
      </div>
    );
};

export default withRouter(UpdateCar);