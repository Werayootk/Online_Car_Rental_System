import React, { useState } from "react";
import { HashRouter as Router, Link, withRouter } from "react-router-dom";
import "./ManagementCar.scss";
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Upload,
  notification,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import adminService from "../../../services/adminServices";

const { TextArea } = Input;
const { Item } = Form;

const UpdateCar = () => {
  const [filesCount, setFilesCount] = useState(0);
  const [isImage, setIsImage] = useState(false);
  const [filesListPic, setFilesListPic] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmitImport = async (values) => {
    setLoading(true);
    let formData = new FormData();
    console.log(values);
    for (const file of values.image.fileList) {
      formData.append("image", file.originFileObj);
    }
    // formData.append('image', values.image.file.originFileObj)
    formData.append("car_brand", values.car_brand);
    formData.append("car_type", values.car_type);
    formData.append("car_seat", values.car_seat);
    formData.append("car_transmission", values.car_transmission);
    formData.append("car_register", values.car_register);
    formData.append("car_price", values.car_price);
    console.log(...formData);

    await adminService
      .addCar(formData)
      .then((res) => {
        notification.success({
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const propsImg = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
        console.log(filesCount);
        setFilesCount(fileList.length);
        setFilesListPic(fileList);
      }
    },
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      if (!isPNG || !isJPG || !isJPEG) {
        setIsImage(true);
      } else {
        setIsImage(false);
      }
      if (isImage) {
        notification.error(`${file.name} is not a png or jpeg file`)
      }
      return isPNG || isJPG || isJPEG || Upload.LIST_IGNORE;
    },
  };

  return (
    <div className="car">
      {loading ? (
        <div className="car_spin">
          <Spin size="large" />
        </div>
      ) : (
        <Form name="import_car" onFinish={onSubmitImport}>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <b>ข้อมูลรถ</b>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>รถยี่ห้อ/รุ่น</label>
              <Item
                name="car_brand"
                rules={[
                  {
                    required: true,
                    message: "Please input your car brand!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>ประเภทรถ</label>
              <Item
                name="car_type"
                rules={[
                  {
                    required: true,
                    message: "Please input your car type!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>จำนวนที่นั่ง</label>
              <Item
                name="car_seat"
                rules={[
                  {
                    required: true,
                    message: "Please input your car seat!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>ประเภทเกียร์</label>
              <Item
                name="car_transmission"
                rules={[
                  {
                    required: true,
                    message: "Please input your car transmission!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>ปีที่จดทะเบียนรถ</label>
              <Item
                name="car_register"
                rules={[
                  {
                    required: true,
                    message: "Please input your car register!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <label>ราคาเช่าต่อวัน</label>
              <Item
                name="car_price"
                rules={[
                  {
                    required: true,
                    message: "Please input your car price!",
                  },
                ]}
              >
                <Input size="large" />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
            <Col sm={{ span: 24 }} lg={{ span: 16 }}>
              <label>รูปถ่ายภาพรถ</label>
              <div style={{ marginTop: "10px" }}>
                <Item
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Please upload car images!",
                    },
                  ]}
                >
                  <Upload {...propsImg}>
                    {filesCount < 5 && (
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    )}
                  </Upload>
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
                <Button id="btn-del">แก้ไขข้อมูลรถ</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default withRouter(UpdateCar);
