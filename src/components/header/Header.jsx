import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faUsers } from '@fortawesome/free-solid-svg-icons';

import './header.css';

const Header = () => {
    return (
        <header className="header-section">
            <div className="container">
                <div className="header-area">
                    <h1 className="header-title">Employee Database</h1>
                    <nav className="header-nav">
                        <ul>
                            <li><Link className='header-nav-link' to='/'><FontAwesomeIcon icon={faHouse} />Home</Link></li>
                            <li><Link className='header-nav-link' to='/reports'><FontAwesomeIcon icon={faCircleInfo} />Reports</Link></li>
                            <li><Link className='header-nav-link' to='/profiles'><FontAwesomeIcon icon={faUsers} />Profiles</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;