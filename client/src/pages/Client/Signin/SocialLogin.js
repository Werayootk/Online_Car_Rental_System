import React, { useSate, useEffect } from "react";
import './SocialLogin.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import {ReactComponent as Facebook_Logo} from '../../../assets/images/facebook-icon.svg';
import {ReactComponent as Google_Logo} from '../../../assets/images/google-icon.svg';
import userService from "../../../services/userServices";

const SocialLogin = () => {
    const google = async () => {
        window.open("http://localhost:8000/user/google", "_self");
    }
    
      const facebook = () => {
        window.open("http://localhost:8000/user/facebook", "_self");
      };
    return (
        <div className="signup-buttons" onClick={google}>
            <div className="google-signup">
                <Google_Logo/>Google
            </div>
            <div className="facebook-signup" onClick={facebook}>
                <Facebook_Logo/>Facebook
            </div>
    </div>
    );
};

export default SocialLogin;