import React, { useState, useEffect } from "react";
import "./SocialLogin.scss";
import { HashRouter as Router, Link, NavLink } from "react-router-dom";
import { ReactComponent as Facebook_Logo } from "../../../assets/images/facebook-icon.svg";
import { ReactComponent as Google_Logo } from "../../../assets/images/google-icon.svg";
import userService from "../../../services/userServices";
import localStorageServices from "../../../services/localStorageUserServices";
import { notification } from "antd";
import GoogleLogin from "react-google-login";
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
    }).then(res => {
        console.log(res);
    });
  };

  return (
    <div className="signup-buttons">
      <div className="google-signup" onClick={signinWithGoogle}>
        <a
          style={{ color: "white", textDecoration: "none" , border: "none", cursor:"pointer"}}
          href="http://localhost:8000/user/google"
        >
          <Google_Logo />
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Google"
            onSuccess={signinWithGoogle}
            onFailure={signinWithGoogle}
            cookiePolicy={"single_host_origin"}
            style={{ border: "none", cursor:"pointer"}}
          />
        </a>
      </div>
      <div className="facebook-signup">
        <Facebook_Logo />
        Facebook
      </div>
    </div>
  );
};

export default SocialLogin;
