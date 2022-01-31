import React from 'react';
import './Main.scss';
import { HashRouter as Router, Link, NavLink } from 'react-router-dom';

const Main = () => {
    return (
        <div className='main'>
            <nav id="mainmenu-navbar">
            <div className="headerMain"><Link to="/"><div className="mainLogo"></div></Link></div>
            <div className='container'>
                
            </div>
            </nav>
        </div>
    );
}


export default Main;