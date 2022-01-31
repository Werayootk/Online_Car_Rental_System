import React from 'react';
import { Avatar, Row, Col, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'
import { MenuList } from '../../routes/router';
import './NavBar.scss';

const HeadTitle = () => {
    const location = useLocation();
    const pathname = location.pathname.match(/[/][a-z-A-z]*/)?.toString();
    const currentPage = MenuList.filter(x => x.path === pathname)[0];
    return (
        <Typography className="title">
          {currentPage.path === '/' ? '' : currentPage.nameTH}
        </Typography>
      );
}

const NavBar = () => (
    <div className="NavBar">
    <Row>
      <Col lg={{ span: 12 }} sm={{ span: 24 }}>
        <HeadTitle />
      </Col>
      <Col lg={{ span: 12 }} sm={{ span: 24 }} className="userInfo">
        {
          <Avatar size={45} style={{ background: '#ccc' }} src={<UserOutlined />} />
        }
        <div className="username">Admin</div>
      </Col>
    </Row>
  </div>
);

export default NavBar;
