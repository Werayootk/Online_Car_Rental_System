import React, { useState, useEffect } from "react";
import "./Register.scss";
import { HashRouter as Router, Link, NavLink, useHistory } from "react-router-dom";
import { Form, notification, Button, Input } from "antd";
import localStorageServices from "../../../services/localStorageUserServices";
import userService from '../../../services/userServices';
import SocialLogin from "./SocialLogin";

const { Item } = Form;
const { Password } = Input;

const Register = () => {
    const history = useHistory();

    const onClickRegister = async (values) => {
        console.log(values);
        const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password
        }
        await userService.register(data).then(res => { 
            console.log(res)
            notification.success({
                message: res.data.message
            })
            history.push('/login');
        }).catch(err => {
            console.error(err);
            notification.error({
              message: "มีชื่อผู้ใช้งานนี้แล้วให้เปลี่ยนอีเมล",
            });
        })
    };

  return (
    <div className="main-container-register">
      <Form name="register" onFinish={onClickRegister}>
        <div className="box-container">
          <h2 className="heading">Create Your Account</h2>
          <div className="form-fields">
            <Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input your First-Name!",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Item>
          </div>
          <div className="form-fields">
            <Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last-Name!",
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Item>
          </div>
          <div className="form-fields">
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
              <Input placeholder="E-mail" />
            </Item>
          </div>
          <div className="form-fields">
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message: "รหัสผ่านต้องมีความยาว 8 ตัวอักษรขึ้นไป"
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="password" />
            </Item>
          </div>
          <div className="form-fields">
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="createaccount"
              >
                Create your account
              </Button>
            </Item>
          </div>
          <div className="login-choice">
            <span>or sign up with</span>
          </div>
          <SocialLogin />
          <div>
            <p className="center">
              By signing up you agree to the
              <Link to={"/"}>Terms of Service.</Link>
            </p>
          </div>
        </div>
      </Form>
      <div className="footer">
        <p>
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
