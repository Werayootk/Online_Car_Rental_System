import React, { useState } from "react";
import "./ForgotPassword.scss";
import { HashRouter as Router, Link, NavLink, useHistory } from 'react-router-dom';
import { Form, notification, Button, Input } from "antd";
import userService from '../../../services/userServices';

const { Item } = Form;
const { Password } = Input;
 
const ForgotPassword = () => {
  const onClickForgotPassword = async (values) => {
      console.log(values);
      const data = {
          email: values.email,
      }
      await userService.forgotPassword(data).then(res => { 
          console.log(res)
          notification.success({
              message: res.data.message
          })
      }).catch(err => {
          console.error(err);
          notification.error({
            message: "ไม่พบผู้ใช้งานนี้แล้วในระบบให้เปลี่ยนอีเมล",
          });
      })
  };
  return (
    <div className="main-container-forgot">
      <Form name="forgot" onFinish={onClickForgotPassword}>
        <div className="box-container-forgot">
          <h2 className="heading-forgot">Forgot Password</h2>
          <div className="form-fields-forgot">
          <Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
          >
            <Input placeholder="Email Address"/>
          </Item>
          </div>
          <div className="form-fields-forgot">
            <Item>
            <Button
                type="primary"
                htmlType="submit"
                className="forGot"
              >
                Reset My Password
              </Button>
            </Item>
          </div>
        </div>
      </Form>
      <div className="footer">
            <p>Already have an account? <Link to={'./login'}><span>Sign In</span></Link></p>
        </div>
    </div>
  );
};

export default ForgotPassword;
