import React, { useState } from "react";
import "./EditPassWord.scss";
import { Form, notification, Button, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import localStorageServices from "../../../services/localStorageUserServices";
import userService from "../../../services/userServices";

const { Item } = Form;
const { Password } = Input;
const { getUserInfo } = localStorageServices;

const EditPassWord = () => {
  const [userInfo, setuserInfo] = useState(getUserInfo());

  const onClickEditPassword = async (values) => {
    console.log(values);
    const data = {
      oldPassword: values.oldPassword,
      password: values.password,
    };
    await userService
      .editUserPassword(data)
      .then((res) => {
        console.log(res);
        notification.success({
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "แก้ไขรหัสผ่านไม่สำเร็จเนื่องจากรหัสผ่านอาจไม่ถูกต้อง",
        });
      });
  };

  return (
    <div className="editpass">
      <div className="editpass_body">
        <h2>ตั้งรหัสผ่าน</h2>
        <Form name="edit-password" onFinish={onClickEditPassword}>
          <div className="editpass-form__group">
            <div className="editpass-form__group-input">
              <label htmlFor="oldpassword">รหัสผ่านปัจจุบัน</label>

              <Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="ใส่รหัสผ่านปัจจุบัน" />
              </Item>
            </div>
          </div>
          <div className="editpass-form__group">
            <div className="editpass-form__group-input">
              <label htmlFor="newpassword">รหัสผ่านใหม่</label>
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="ตั้งรหัสผ่านใหม่" />
              </Item>
            </div>
          </div>
          <div className="editpass-form__group">
            <div className="editpass-form__group-input">
              <label htmlFor="confirmpassword">รหัสผ่านใหม่อีกครั้ง</label>
              <Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="ใส่รหัสผ่านใหม่อีกครั้ง" />
              </Item>
            </div>
          </div>
          <p className="warnning-text">
            กรุณาตั้งรหัสผ่านที่มีอักขระ 8 ตัวขึ้นไป โดยใช้ตัวอักษร หรือตัวเลข
          </p>
          <Item>
            <Button
              className="password-submit"
              type="primary"
              htmlType="submit"
            >
              บันทึก
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default EditPassWord;
