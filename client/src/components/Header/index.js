import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css';
import '../../logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const renderControls = () => {
    // If logged in show logout controls
    if (Auth.loggedIn()) {
      return (
        <>
          <Link className="navlink" to="/profile">
            {Auth.getProfile().data.username}'s Profile
          </Link>
          <Link className="navlink" to="/blog">
          {Auth.getProfile().data.username}'s Blog
          </Link>
          <button className="navlink" onClick={logout}>
            Logout
          </button>
        </>
      );
    }
    // If logged out show login controls
    return (
      <>
        <Link className="navlink" to="/signin">
          Account Sign-in
        </Link>
        <Link className="btn" to="/portfolio">
          Portfolio
        </Link>
      </>
    )
  };

  return (
    <header className="bg-light text-dark mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="header" to="/">
            <h1 className="title">Bullrun</h1>
            <p className="subtitle">Stock Market Trading Simulator</p>
          </Link>
        </div>
        <div>
          {renderControls()}
        </div>
      </div>
    </header>
  );
};

export default Header;
