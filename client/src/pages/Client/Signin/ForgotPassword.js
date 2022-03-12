import React from "react";
import "./ForgotPassword.scss";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';

/** TODO 4
 * 1. axios call backend
 * 2. add antd validate
 * 3. add page reset password
 */

const ForgotPassword = () => {
  return (
    <div className="main-container-forgot">
      <form>
        <div className="box-container-forgot">
          <h2 className="heading-forgot">Forgot Password</h2>
          <div className="form-fields-forgot">
            <input
              id="forgot"
              name="forgot"
              type="text"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-fields-forgot">
            <button className="forGot" name="commit-forgot" type="submit">
              Reset My Password
            </button>
          </div>
        </div>
      </form>
      <div className="footer">
            <p>Already have an account? <Link to={'./login'}><span>Sign In</span></Link></p>
        </div>
    </div>
  );
};

export default ForgotPassword;
