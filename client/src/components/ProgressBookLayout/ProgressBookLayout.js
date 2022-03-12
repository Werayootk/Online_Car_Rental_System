import React from "react";
import './ProgressBookLayout.scss';
import { MainLayout } from "../MainLayout/MainLayout";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Redirect, Route, RouteProps, withRouter } from "react-router-dom";

const ProgressBarLayout = ({ children, ...rest }) => {
    return (
        <>
            <ProgressBar />
            {children}
        </>
    );
};

const ProgressBookLayoutRoute = ({ component: Component, role, setRole, ...rest }) => {
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