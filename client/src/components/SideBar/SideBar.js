import React from "react";
import './SideBar.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuList } from '../../routes/router';
import { useLocation } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
const menuList = MenuList;

const SideBar = () => {
    const location = useLocation();
    const pathname = location.pathname.match(/[/][a-z-A-z]*/)?.toString();
    const key = MenuList.filter(x => x.path === pathname)[0].id - 1;
    const selectedKey = key.toString();

    return (
        <div className="SideMenu">
            <div className="headerSidebar"><Link to="/"><div className="sidebarLogo"></div></Link></div>
            <div className="menubar">
                <Menu mode="inline" defaultSelectedKeys={[selectedKey]}>
                    {
                        menuList.map((x, i) => {
                            return <Menu.Item key={i} icon={x.icon}><NavLink to={x.path}>{x.nameTH}</NavLink></Menu.Item>
                        })
                    }
                </Menu>
            </div>
        </div>
    );
}

export default SideBar;
