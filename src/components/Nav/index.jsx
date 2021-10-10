import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo-bg.png';
import Classes from '../../styles/Nav.module.css';
import Account from './Account';

const Nav = () => (
    <nav className={Classes.nav}>
        <ul>
            <li>
                <Link to="/" className={Classes.brand}>
                    <img src={image} alt="Learn with Sumit Logo" />
                    <h3>Learn with Sumit</h3>
                </Link>
            </li>
        </ul>

        <Account />
    </nav>
);

export default Nav;
