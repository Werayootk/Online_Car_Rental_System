import React from "react";
import { Redirect, Route, RouteProps, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import './DashboardLayout.scss';

const { Header, Footer, Sider, Content } = Layout;

const DashboardLayout = ({ children, ...rest }) => {
    return (
        <Layout>
          <Sider width="256px"><SideBar /></Sider>
          <Layout>
            <Header style={{ background: 'none', padding: '0px 40px' }}>
              <NavBar />
            </Header>
            <Content className="site-layout-background main-container">
              {children}
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      );
};

const DashboardLayoutRoute = ({component:Component, ...rest}) => {
    return (
            <Route
              {...rest}
              render={(props) => (
                <DashboardLayout>
                  <Component {...props}/>
                </DashboardLayout>
              )}
            />
    );
}

export default DashboardLayoutRoute;