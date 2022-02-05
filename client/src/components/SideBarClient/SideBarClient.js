import React from "react";
import './SideBarClient.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { manuEditList } from '../../routes/router';
import { useLocation } from 'react-router-dom';

const SideBarClient = () => {
    const location = useLocation();
    const pathname = location.pathname.match(/[/][a-z-A-z]*/)?.toString();
    const key = manuEditList.filter(x => x.path === pathname)[0].id - 1;
    const selectedKey = key.toString();

    return (
        <div className="sidebar">
            <Menu mode="inline" defaultSelectedKeys={[selectedKey]}>
                    {
                        manuEditList.map((x, i) => {
                            return <Menu.Item key={i} icon={x.icon}><NavLink to={x.path}>{x.nameTH}</NavLink></Menu.Item>
                        })
                    }
            </Menu>
        </div>
    );
};

export default SideBarClient;