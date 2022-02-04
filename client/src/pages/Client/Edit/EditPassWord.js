import React, { useState } from "react";
import "./EditPassWord.scss";
import { useFormik, Field, Form, Formik } from "formik";

const EditPassWord = () => {
  const formikPass = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="editpass">
      <div className="editpass_body">
        <h2>ตั้งรหัสผ่าน</h2>
        <form onSubmit={formikPass.handleSubmit}>
          <div className="editpass-form__group">
            <div className="editpass-form__group-input">
              <label htmlFor="oldpassword">รหัสผ่านปัจจุบัน</label>
              <input
                id="oldpassword"
                name="oldpassword"
                type= "password"
                placeholder="ใส่รหัสผ่านปัจจุบัน"
                onChange={formikPass.handleChange}
                value={formikPass.values.oldpassword}
              />
            </div>
            <div className="editpass-form__group-input">
              <label htmlFor="newpassword">รหัสผ่านใหม่</label>
              <input
                id="newpassword"
                name="newpassword"
                type="password"
                placeholder="ตั้งรหัสผ่านใหม่"
                onChange={formikPass.handleChange}
                value={formikPass.values.newpassword}
              />
            </div>
            <div className="editpass-form__group-input">
              <label htmlFor="confirmpassword">รหัสผ่านใหม่อีกครั้ง</label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                placeholder="ใส่รหัสผ่านใหม่อีกครั้ง"
                onChange={formikPass.handleChange}
                value={formikPass.values.confirmpassword}
              />
            </div>
          </div>
          <p className="warnning-text">
            กรุณาตั้งรหัสผ่านที่มีอักขระ 8 ตัวขึ้นไป โดยใช้ตัวอักษร หรือตัวเลข
          </p>
          <button className="password-submit" type="submit">บันทึก</button>
        </form>
      </div>
    </div>
  );
};

export default EditPassWord;
