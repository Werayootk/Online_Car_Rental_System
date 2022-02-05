import React from "react";
import "./Login.scss";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {

  return (
    <div className="main-container-login">
    <form>
      <div className="box-container">
        <h2 className="heading">Sign In</h2>
        <div className="form-fields">
          <input id="email" name="email" type="text" placeholder="Email Address" />
        </div>
        <div className="form-fields">
          <input id="password" name="password" type="text" placeholder="Password"/>
        </div>
        <div className="form-fields">
          <button className="signIn" name="commit" type="submit">
            Sign In
          </button>
        </div>
        <div className="login-choice"><span>or Sign In with</span></div>
          <SocialLogin />
      </div>
    </form>
    <div className="footer">
        <p>Don't have an account? <Link to={'/signup'}><span>Create one now</span></Link></p>
        <p><Link to={'/forgot'}><span>Forgot password?</span></Link></p>
    </div>
  </div>
  );
};

export default Login;
