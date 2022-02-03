import React from "react";
import { Redirect, Route, RouteProps, withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './MainLayout.scss';

const { Header, Footer, Sider, Content } = Layout;

const MainLayout = ({ children, ...rest }) => {
    return (
        <Layout>
            <Header className="header-nav" style={{zIndex: '12'}}><HeaderClient /></Header>
            <Content className="main-container" style={{position: 'relative', zIndex: '1'}}>
                {children}
            </Content>
        <Footer className="footer-main"><FooterClient /></Footer>
      </Layout>
    );
};


const MainLayoutRoute = ({ component: Component, ...rest }) => {
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
