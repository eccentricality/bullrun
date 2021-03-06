import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css';
import '../../logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location = '/';
  };

  const renderControls = () => {
    // If logged in show logout controls
    if (Auth.loggedIn()) {
      return (
        <div className="sign-in">
          <p className="loginText">
            Welcome, {Auth.getProfile().data.username}!
          </p>
          <Link className="navlink" onClick={logout}>
            Signout
          </Link>
        </div>
      )}
    // If logged out show login controls
    return (
      <div className="sign-in">
        <Link className="navlink" to="/signin">
          Account Sign-in
        </Link>
      </div>
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
