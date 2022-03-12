import React from "react";
import { Redirect, Route, RouteProps, withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './MainLayout.scss';

const { Header, Footer, Sider, Content } = Layout;

export const MainLayout = ({ children, ...rest }) => {
    return (
        <Layout>
            <Header className="header-nav"><HeaderClient /></Header>
            <Content className="main-container">
                {children}
            </Content>
        <Footer className="footer-main"><FooterClient /></Footer>
      </Layout>
    );
};


const MainLayoutRoute = ({ component: Component, role, setRole, ...rest }) => {
        /**
         * 1. guest can access for login sign up bra bra
         * 2. user redirect has been auth for access navbar change for edit
         * 3. admin redirect to dashboard
         * check 3 case
         */
    if (role === 'user') {
        return <Redirect to="/home" /> 
    } else if (role === 'admin') {
        return <Redirect to="/dashboard" /> 
    }
        return (
            <Route
                {...rest}
                render={(props) => (
                    <MainLayout>
                        <Component {...props} />
                    </MainLayout>
                )}
            />
        );
};

export default MainLayoutRoute;
