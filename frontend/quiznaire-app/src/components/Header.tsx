import React from 'react';
import './Header.css';
import logo from '../logo.png'

const Header: React.FC = () => {
    return (
        <header className="App-header">
        <div className="logo">
            <a href="/">
                <img class="header-logo" src={logo}  alt="Quiznaire Logo"/>
            </a>
        </div>
        <nav className="main-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Games</a></li>
                <li><a href="/">Categories</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;