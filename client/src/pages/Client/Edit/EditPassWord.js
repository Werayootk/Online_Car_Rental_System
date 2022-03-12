import React, { useState } from "react";
import "./EditPassWord.scss";
import { Field, Form, Formik } from "formik";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

/** TODO 6
 * 1. Add validate on formilk
 * 2. axios to BE notification
 */

const EditPassWord = () => {
  const [ToggleOldPassword, setToggleOldPassword] = useState(false);
  const [ToggleNewPassword, setToggleNewPassword] = useState(false);
  const [ToggleConfirm, setToggleConfirm] = useState(false);

  const toggleOldPasswordVisiblity = () => {
    setToggleOldPassword(!ToggleOldPassword);
  };

  const toggleNewPasswordVisiblity = () => {
    setToggleNewPassword(!ToggleNewPassword);
  };

  const toggleConPasswordVisiblity = () => {
    setToggleConfirm(!ToggleConfirm);
  };

  return (
    <div className="editpass">
      <div className="editpass_body">
        <h2>ตั้งรหัสผ่าน</h2>
        <Formik
          initialValues={{
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form>
            <div className="editpass-form__group">
              <div className="editpass-form__group-input">
                <label htmlFor="oldpassword">รหัสผ่านปัจจุบัน</label>
                <Field
                  type={ToggleOldPassword ? "text" : "password"}
                  id="oldpassword"
                  name="oldpassword"
                  className="form-control rounded-0"
                  placeholder="ใส่รหัสผ่านปัจจุบัน"
                />
                {!ToggleOldPassword && (
                  <EyeInvisibleOutlined className="oldpassword-icon" onClick={toggleOldPasswordVisiblity} />
                )}
                {ToggleOldPassword && (
                  <EyeOutlined className="oldpassword-icon" onClick={toggleOldPasswordVisiblity} />
                )}
              </div>
            </div>
            <div className="editpass-form__group">
              <div className="editpass-form__group-input">
                <label htmlFor="newpassword">รหัสผ่านใหม่</label>
                <Field
                  type={ToggleNewPassword ? "text" : "password"}
                  id="newpassword"
                  name="newpassword"
                  className="form-control rounded-0"
                  placeholder="ตั้งรหัสผ่านใหม่"
                />
                {!ToggleNewPassword && (
                  <EyeInvisibleOutlined className="newpassword-icon" onClick={toggleNewPasswordVisiblity} />
                )}
                {ToggleNewPassword && (
                  <EyeOutlined className="newpassword-icon" onClick={toggleNewPasswordVisiblity} />
                )}
              </div>
            </div>
            <div className="editpass-form__group">
              <div className="editpass-form__group-input">
                <label htmlFor="confirmpassword">รหัสผ่านใหม่อีกครั้ง</label>
                <Field
                  type={ToggleConfirm ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  className="form-control rounded-0"
                  placeholder="ใส่รหัสผ่านใหม่อีกครั้ง"
                />
                {!ToggleConfirm && (
                  <EyeInvisibleOutlined className="confirmpassword-icon" onClick={toggleConPasswordVisiblity} />
                )}
                {ToggleConfirm && (
                  <EyeOutlined className="confirmpassword-icon" onClick={toggleConPasswordVisiblity} />
                )}
              </div>
            </div>
            <p className="warnning-text">
              กรุณาตั้งรหัสผ่านที่มีอักขระ 8 ตัวขึ้นไป โดยใช้ตัวอักษร หรือตัวเลข
            </p>
            <button className="password-submit" type="submit">
              บันทึก
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPassWord;
