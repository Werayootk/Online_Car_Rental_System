import React, { useState, useEffect } from "react";
import "./Login.scss";
import {
  HashRouter as Router,
  Link,
  NavLink,
  useHistory,
} from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { Form, Input, Button, notification } from "antd";
import userService from "../../../services/userServices";
import localStorageServices from "../../../services/localStorageUserServices";

/** TODO 2
 * 2. implement social login and check data store to DB
 */
const { Item } = Form;
const { Password } = Input;
const { setToken } = localStorageServices;

const Login = () => {
  const history = useHistory();
  const [role, setRole] = useState(localStorageServices.getRole());

  const onClickLogin = async (values) => {
    console.log(values);
    const data = {
      email: values.email,
      password: values.password,
    };
    await userService
      .login(data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        setRole(localStorageServices.getRole());
        history.push("/");
        notification.success({
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "อีเมลหรือรหัสผ่านไม่ถูกต้องโปรดลองอีกครั้ง",
        });
      });
  };

  return (
    <div className="main-container-login">
      <div className="box-container">
        <h2 className="heading">Sign In</h2>
        <div className="form-fields">
          <Form name="login" onFinish={onClickLogin}>
            <Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="อีเมล" />
            </Item>
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
              <Input.Password />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Item>
          </Form>
        </div>

        <div className="login-choice">
          <span>or Sign In with</span>
        </div>
        <SocialLogin />
      </div>
      <div className="footer">
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span>Create one now</span>
          </Link>
        </p>
        <p>
          <Link to={"/forgot"}>
            <span>Forgot password?</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
