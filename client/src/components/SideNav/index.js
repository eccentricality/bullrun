import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Sidenav() {
    return (
        <ul className="sidenav sidenav-fixed">
            <li>
                <Link to="/" className="navlink">
                    <i className="material-icons left">house</i>
                    Home
                </Link>
            </li>
            <li>
                <Link to="/profile" className="navlink">
                    <i className="material-icons left">account_circle</i>
                    User Profile
                </Link>
            </li>
            <li>
                <Link to="/portfolio" className="navlink">
                    <i className="material-icons left">business_center</i>
                    Portfolio
                </Link>
            </li>
            <li>
                <Link to="/" className="navlink">
                    <i className="material-icons left">account_balance</i>
                    Trade History
                </Link>
            </li>
            <li>
                <Link to="/trends" className="navlink">
                    <i className="material-icons left">arrow_upward</i>
                    Trending
                </Link>
            </li>
            <li>
                <Link to="/blog" className="navlink">
                    <i className="material-icons left">comment</i>
                    Blog
                </Link>
            </li>
            <li>
                <Link to="/" className="navlink">
                    <i className="material-icons left">attach_money</i>
                    Fortune 500
                </Link>
            </li>
            <li>
                <Link to="/" className="navlink">
                    <i className="material-icons left">link</i>
                    Resources
                </Link>
            </li>
        </ul>
    );
};