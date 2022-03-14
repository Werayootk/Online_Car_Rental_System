import React, { useState } from "react";
import "./ResetPassword.scss";
import {
  HashRouter as Router,
  Link,
  NavLink,
  useHistory, useRouteMatch
} from "react-router-dom";
import { Form, notification, Button, Input } from "antd";
import userService from "../../../services/userServices";

const { Item } = Form;
const { Password } = Input;

const ResetPassword = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const onClickResetPassword = async (values) => {
    console.log(values);
    console.log(match.params.param_token);
    const data = {
      password: values.password,
      resetPasswordToken: match.params.param_token
    };
    await userService
      .updatePassword(data)
      .then((res) => {
        console.log(res);
        notification.success({
          message: res.data.message,
        });
        history.push("/login");
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "password reset link is invalid or has expired",
        });
      });
  };
  return (
    <div className="main-container-reset-password">
      <Form name="reset" onFinish={onClickResetPassword}>
        <div className="box-container-reset-password">
          <h2 className="heading-reset-password">Reset Password</h2>
          <div className="form-fields-reset-password">
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

          <div className="form-fields-reset-password">
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
          <div className="form-fields-reset-password">
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="reSet-password"
              >
                Reset My Password
              </Button>
            </Item>
          </div>
        </div>
      </Form>
      <div className="footer">
        <p>
          Already have an account?{" "}
          <Link to={"./login"}>
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
