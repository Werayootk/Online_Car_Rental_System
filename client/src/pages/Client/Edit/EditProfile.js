import React,{ useState, useEffect } from "react";
import "./EditProfile.scss";
import { Form ,notification, Button, Input} from 'antd'
import localStorageServices from "../../../services/localStorageUserServices";
import userService from '../../../services/userServices';

 const { Item } = Form;
const { Password } = Input;
const { getUserInfo } = localStorageServices;

const EditProfile = () => {
  const [userInfo, setuserInfo] = useState(getUserInfo());

  const onClickEditProfile = async (values) => {
    console.log(values);
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      email: values.email
    };
    await userService.editUserProfile(data).then(
      res => {
        console.log(res)
        notification.success({
          message: res.data.message
        })
      }).catch(err => {
        console.error(err);
        notification.error({
          message: "แก้ไขข้อมูลไม่สำเร็จ",
        });
    });
  }

  return (
    <div className="editprofile">
      <div className="edit_boby">
        <h2>แก้ไขข้อมูลส่วนตัว</h2>
        <p className="profile__description">
          ข้อมูลนี้จะถูกใช้เพื่อป้อนรายละเอียดของคุณโดยอัตโนมัติเพื่อให้คุณสามารถทำการจองได้อย่างรวดเร็ว
          รายละเอียดของคุณจะได้รับการจัดเก็บไว้อย่างปลอดภัยและจะไม่ถูกเผยแพร่ต่อสาธารณะ
        </p>
        <Form name="edit-profile" onFinish={onClickEditProfile}>
          <div className="info-form__group">
            <div className="info-form-input">
              <label htmlFor="firstName">ชื่อจริง (ตามบัตรประชาชน)*</label>
              <Item name="first_name">
                <Input value={userInfo.first_name} placeholder={userInfo.first_name}/>
              </Item>
            </div>
            <div className="info-form-input">
              <label htmlFor="lastName">นามสกุล (ตามบัตรประชาชน)*</label>
              <Item name="last_name">
                <Input value={userInfo.last_name} placeholder={userInfo.last_name}/>
              </Item>
            </div>
          </div>
          <div className="info-form__group">
            <div className="info-form-input">
              <label htmlFor="tel">เบอร์โทรศัพท์มือถือ</label>
              <Item name="phone_number">
                <Input value={userInfo.phone_number} placeholder={userInfo.phone_number}/>
              </Item>
            </div>
            <div className="info-form-input">
              <label htmlFor="email">อีเมล</label>
              <Item name="email">
                <Input value={userInfo.email} placeholder={userInfo.email}/>
              </Item>
            </div>
          </div>
          <p className="requirement-text">*จำเป็นต้องกรอก</p>
          <Item>
            <Button
                type="primary"
                htmlType="submit"
                className="account-submit"
            >
              บันทึก
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
