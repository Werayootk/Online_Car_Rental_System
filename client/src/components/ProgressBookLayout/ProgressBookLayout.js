import React,{ useEffect, useState }  from "react";
import './ProgressBookLayout.scss';
import { MainLayout } from "../MainLayout/MainLayout";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Redirect, Route, RouteProps, withRouter } from "react-router-dom";
import localStorageServices from "../../services/localStorageUserServices";
const { getRole } = localStorageServices;

const ProgressBarLayout = ({ children, ...rest }) => {
    return (
        <>
            <ProgressBar />
            {children}
        </>
    );
};

const ProgressBookLayoutRoute = ({ component: Component, ...rest }) => {
  const [role, setRole] = useState(getRole());

  if (role === 'user') {
    return (
      <Route
      {...rest}
      render={(props) => (
        <MainLayout>
          <ProgressBarLayout>
            <Component {...props} />
          </ProgressBarLayout>
        </MainLayout>
      )}
      />
  );
  } else {
    return <Redirect to="/login" />
  }    
};

export default ProgressBookLayoutRoute;