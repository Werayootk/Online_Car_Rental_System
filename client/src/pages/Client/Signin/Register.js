import React from "react";
import "./Register.scss";
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import SocialLogin from './SocialLogin';

/** TODO 3
 *  1. reform first_name and last_name
 *  2. Add validate use antd
 *  3. axios register save token follow krunot
 *  
 */
const Register = () => {

  return (
    <div className="main-container-register">
        <form>
            <div className="box-container">
                <h2 className="heading">
                Create Your Account
                </h2>
                <div className="form-fields">
                <input id="user_name" name="username" type="text" placeholder="Full name" />
                </div>
                <div className="form-fields">
                <input id="email" name="email" type="text" placeholder="Email Address" />
                </div>
                <div className="form-fields">
                <input id="password" name="password" type="text" placeholder="Password" />
                </div>
                <div className="form-fields">
                <button className="createaccount" name="commit" type="submit">
                    Create your account
                </button>
                </div>
                <div className="login-choice"><span>or sign up with</span></div>
                <SocialLogin />
                <div>
                    <p className="center">
                        By signing up you agree to the
                        <Link to={'./'}>Terms of Service.</Link>
                    </p>
                </div>
            </div>
        </form>
        <div className="footer">
            <p>Already have an account? <Link to={'./login'}><span>Sign In</span></Link></p>
        </div>
    </div>
  );
};

export default Register;
