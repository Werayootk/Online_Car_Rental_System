import React from "react";
import "./EditProfile.scss";
import { useFormik } from "formik";

const EditProfile = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="editprofile">
      <div className="edit_boby">
        <h2>แก้ไขข้อมูลส่วนตัว</h2>
        <p className="profile__description">
          ข้อมูลนี้จะถูกใช้เพื่อป้อนรายละเอียดของคุณโดยอัตโนมัติเพื่อให้คุณสามารถทำการจองได้อย่างรวดเร็ว
          รายละเอียดของคุณจะได้รับการจัดเก็บไว้อย่างปลอดภัยและจะไม่ถูกเผยแพร่ต่อสาธารณะ
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="info-form__group">
            <div className="info-form-input">
              <label htmlFor="firstName">ชื่อจริง (ตามบัตรประชาชน)*</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </div>
            <div className="info-form-input">
              <label htmlFor="lastName">นามสกุล (ตามบัตรประชาชน)*</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </div>
          </div>
          <div className="info-form__group">
            <div className="info-form-input">
              <label htmlFor="tel">เบอร์โทรศัพท์มือถือ</label>
              <input
                id="tel"
                name="tel"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.tel}
              />
            </div>
            <div className="info-form-input">
              <label htmlFor="email">อีเมล</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
                  </div>
                  <p className="requirement-text">*จำเป็นต้องกรอก</p>
          <button type="submit" className="account-submit">บันทึก</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
