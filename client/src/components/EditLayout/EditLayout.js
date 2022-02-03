import React from "react";
import "./EditLayout.scss";
import { MainLayout } from "../MainLayout/MainLayout";
import SideBarClient from "../SideBarClient/SideBarClient";
import { Redirect, Route, RouteProps, withRouter } from "react-router-dom";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const EditLayout = ({ children, ...rest }) => {
  return (
    <>
      <SideBarClient />
      {children}
    </>
  );
};

const EditLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <MainLayout>
          <EditLayout>
            <Component {...props} />
          </EditLayout>
        </MainLayout>
      )}
    />
  );
};

export default EditLayoutRoute;
