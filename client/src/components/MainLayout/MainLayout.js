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
        <Header style={{ background: 'none',padding: '0px 0px' }}><HeaderClient /></Header>
            <Content className="site-layout-background main-container">
                {children}
            </Content>
        <Footer style={{ background: 'none', padding: '0px 0px' }}><FooterClient /></Footer>
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
