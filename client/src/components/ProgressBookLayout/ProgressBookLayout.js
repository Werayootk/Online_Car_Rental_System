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

const ProgressBookLayoutRoute = ({ component: Component, ...rest }) => {
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
};

export default ProgressBookLayoutRoute;