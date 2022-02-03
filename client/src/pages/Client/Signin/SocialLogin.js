import React from "react";
import './SocialLogin.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import {ReactComponent as Facebook_Logo} from '../../../assets/images/facebook-icon.svg';
import {ReactComponent as Google_Logo} from '../../../assets/images/google-icon.svg';

const SocialLogin = () => {

    return (
        <div className="signup-buttons">
            <div className="google-signup">
                <Link to={'/'}><Google_Logo/>Google</Link>
            </div>
            <div className="facebook-signup">
                <Link to={'/'}><Facebook_Logo/>Facebook</Link>
            </div>
    </div>
    );
};

export default SocialLogin;