import React,{ useEffect, useState } from "react";
import { Redirect, Route, RouteProps, withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './MainLayout.scss';

import localStorageServices from "../../services/localStorageUserServices";
const { getRole } = localStorageServices;
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


const MainLayoutRoute = ({ component: Component , ...rest }) => {
    const [role, setRole] = useState(getRole());
    
    if (role === 'admin') {
        return <Redirect to="/customer" /> 
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
