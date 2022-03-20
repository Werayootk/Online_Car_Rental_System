import React, { useState } from "react";
import "./Location.scss";
import { Input, Select, Button, Row, Col, Form, notification } from "antd";
import ResponsibilityLocation from "./ResponsibilityLocation";
import adminService from "../../../services/adminServices";

const { Option } = Select;
const { Item } = Form;

const InputLocation = (props) => {
  const [selectProvince, setSelectProvince] = useState();
  const [inputLocation, setInputLocation] = useState();

  const onFinish = async (values) => {
    console.log(values.province, values.location);
    setInputLocation(values.location);
    setSelectProvince(values.province);
    const dataLocation = {
      location: values.location,
      province: values.province
    }
    await adminService.addLocation(dataLocation).then(res => {
      notification.success({
        message: res.data.message
      })
    }).catch(err => {
      console.error(err);
    })
  };

  return (
    <div id="input-box">
      <div className="content">
        <Form name="location" onFinish={onFinish}>
          <Row align="middle">
            <Col span={9}>
              <Item
              name="province"
              rules={[{required:true, message:"Please select province!."}]}
              >
              <Select
                showSearch
                placeholder="Select a province"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                size="large"
                >
                <Option value="" selected>--------- เลือกจังหวัด ---------</Option>
                <Option value="กรุงเทพมหานคร">กรุงเทพมหานคร</Option>
                <Option value="กระบี่">กระบี่ </Option>
                <Option value="กาญจนบุรี">กาญจนบุรี </Option>
                <Option value="กาฬสินธุ์">กาฬสินธุ์ </Option>
                <Option value="กำแพงเพชร">กำแพงเพชร </Option>
                <Option value="ขอนแก่น">ขอนแก่น</Option>
                <Option value="จันทบุรี">จันทบุรี</Option>
                <Option value="ฉะเชิงเทรา">ฉะเชิงเทรา </Option>
                <Option value="ชัยนาท">ชัยนาท </Option>
                <Option value="ชัยภูมิ">ชัยภูมิ </Option>
                <Option value="ชุมพร">ชุมพร </Option>
                <Option value="ชลบุรี">ชลบุรี </Option>
                <Option value="เชียงใหม่">เชียงใหม่ </Option>
                <Option value="เชียงราย">เชียงราย </Option>
                <Option value="ตรัง">ตรัง </Option>
                <Option value="ตราด">ตราด </Option>
                <Option value="ตาก">ตาก </Option>
                <Option value="นครนายก">นครนายก </Option>
                <Option value="นครปฐม">นครปฐม </Option>
                <Option value="นครพนม">นครพนม </Option>
                <Option value="นครราชสีมา">นครราชสีมา </Option>
                <Option value="นครศรีธรรมราช">นครศรีธรรมราช </Option>
                <Option value="นครสวรรค์">นครสวรรค์ </Option>
                <Option value="นราธิวาส">นราธิวาส </Option>
                <Option value="น่าน">น่าน </Option>
                <Option value="นนทบุรี">นนทบุรี </Option>
                <Option value="บึงกาฬ">บึงกาฬ</Option>
                <Option value="บุรีรัมย์">บุรีรัมย์</Option>
                <Option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์ </Option>
                <Option value="ปทุมธานี">ปทุมธานี </Option>
                <Option value="ปราจีนบุรี">ปราจีนบุรี </Option>
                <Option value="ปัตตานี">ปัตตานี </Option>
                <Option value="พะเยา">พะเยา </Option>
                <Option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา </Option>
                <Option value="พังงา">พังงา </Option>
                <Option value="พิจิตร">พิจิตร </Option>
                <Option value="พิษณุโลก">พิษณุโลก </Option>
                <Option value="เพชรบุรี">เพชรบุรี </Option>
                <Option value="เพชรบูรณ์">เพชรบูรณ์ </Option>
                <Option value="แพร่">แพร่ </Option>
                <Option value="พัทลุง">พัทลุง </Option>
                <Option value="ภูเก็ต">ภูเก็ต </Option>
                <Option value="มหาสารคาม">มหาสารคาม </Option>
                <Option value="มุกดาหาร">มุกดาหาร </Option>
                <Option value="แม่ฮ่องสอน">แม่ฮ่องสอน </Option>
                <Option value="ยโสธร">ยโสธร </Option>
                <Option value="ยะลา">ยะลา </Option>
                <Option value="ร้อยเอ็ด">ร้อยเอ็ด </Option>
                <Option value="ระนอง">ระนอง </Option>
                <Option value="ระยอง">ระยอง </Option>
                <Option value="ราชบุรี">ราชบุรี</Option>
                <Option value="ลพบุรี">ลพบุรี </Option>
                <Option value="ลำปาง">ลำปาง </Option>
                <Option value="ลำพูน">ลำพูน </Option>
                <Option value="เลย">เลย </Option>
                <Option value="ศรีสะเกษ">ศรีสะเกษ</Option>
                <Option value="สกลนคร">สกลนคร</Option>
                <Option value="สงขลา">สงขลา </Option>
                <Option value="สมุทรสาคร">สมุทรสาคร </Option>
                <Option value="สมุทรปราการ">สมุทรปราการ </Option>
                <Option value="สมุทรสงคราม">สมุทรสงคราม </Option>
                <Option value="สระแก้ว">สระแก้ว </Option>
                <Option value="สระบุรี">สระบุรี </Option>
                <Option value="สิงห์บุรี">สิงห์บุรี </Option>
                <Option value="สุโขทัย">สุโขทัย </Option>
                <Option value="สุพรรณบุรี">สุพรรณบุรี </Option>
                <Option value="สุราษฎร์ธานี">สุราษฎร์ธานี </Option>
                <Option value="สุรินทร์">สุรินทร์ </Option>
                <Option value="สตูล">สตูล </Option>
                <Option value="หนองคาย">หนองคาย </Option>
                <Option value="หนองบัวลำภู">หนองบัวลำภู </Option>
                <Option value="อำนาจเจริญ">อำนาจเจริญ </Option>
                <Option value="อุดรธานี">อุดรธานี </Option>
                <Option value="อุตรดิตถ์">อุตรดิตถ์ </Option>
                <Option value="อุทัยธานี">อุทัยธานี </Option>
                <Option value="อุบลราชธานี">อุบลราชธานี</Option>
                <Option value="อ่างทอง">อ่างทอง </Option>
              </Select>
              </Item>
            </Col>
            <Col span={9} style={{ paddingRight: 20 }}>
              <Item
               name="location"
               rules={[{required:true, message:"Please select location!."}]}
              >
              <Input placeholder="ใส่สถานที่" size="large" />
              </Item>
            </Col>
            <Col span={6}>
              <Item>
              <Button type="primary" htmlType="submit">
                นำเข้าสถานที่
              </Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

const TableLocation = () => {
  return (
    <div className="customer-container">
      <Row>
        <Col span={20} style={{ paddingLeft: 200 }}>
          <ResponsibilityLocation />
        </Col>
      </Row>
    </div>
  );
};

const Location = () => {
  return (
    <div className="location">
      <InputLocation />
      <TableLocation />
    </div>
  );
};

export default Location;
