import React, { useState, useEffect } from "react";
import "./SocialLogin.scss";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { ReactComponent as Facebook_Logo } from "../../../assets/images/facebook-icon.svg";
import { ReactComponent as Google_Logo } from "../../../assets/images/google-icon.svg";
import userService from "../../../services/userServices";
import localStorageServices from "../../../services/localStorageUserServices";
import { notification } from "antd";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import axios from "axios";

const { setToken } = localStorageServices;

const SocialLogin = () => {
  const [role, setRole] = useState(localStorageServices.getRole());

  // const google = async () => {
  //     window.open("http://localhost:8000/user/google", "_target");
  // }

  //   const facebook = () => {
  //     window.open("http://localhost:8000/user/facebook", "_self");
  //   };
  const signinWithGoogle = async (response) => {
    console.log("Res -->", response);
    const {
      tokenObj: { access_token },
      profileObj: { googleId, email, name },
    } = response;
    const user = { name, email, accessToken: access_token, userId: googleId };

    await axios({
      method: "post",
      url: "http://localhost:8000/user/google",
      data: {
        user,
      },
    })
  };

  const signinWithFaceBook = async (response) => {
    console.log('Res -->', response)
    const { name, email, accessToken, userID } = response
    const user = { name, email, accessToken, userId: userID }

    await axios({
      method: 'post',
      url: 'http://localhost:8000/user/facebook',
      data: {
        user,
      },
    })
  };

  return (
    <div className="signup-buttons">
      <div className="google-signup" onClick={signinWithGoogle}>
      <a
          style={{ color: "white", textDecoration: "none" , border: "none", cursor:"pointer"}}
          href="http://localhost:8000/user/google"
        >
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID || "405179135262-nrr7s0ugiirnjb3i09b691qua28lvksg.apps.googleusercontent.com"} 
            onSuccess={signinWithGoogle}
            onFailure={signinWithGoogle}
            cookiePolicy={"single_host_origin"}
            className="btnGoogle"
            icon={<Google_Logo style={{ marginLeft: 
              '5px' }}/>}
          >
            <span>&nbsp;&nbsp;Google</span> 
            </GoogleLogin>
        </a>
      </div>
      <div className="facebook-signup" onClick={signinWithFaceBook}>
      <a
          style={{ color: "white", textDecoration: "none" , border: "none", cursor:"pointer"}}
          href="http://localhost:8000/user/facebook"
        >
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID || "691743551857593"}
          fields='name,email'
          scope='public_profile, email'
          callback={signinWithFaceBook}
          cssClass="btnFacebook"
          icon={<Facebook_Logo style={{ marginLeft: 
            '5px' }} />}
          textButton = "&nbsp;&nbsp;Facebook"                                                                
          />
        
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
