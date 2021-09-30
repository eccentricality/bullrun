import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css';

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
          <Link className="btn btn-lg btn-info m-2" to="/me">
            {Auth.getProfile().data.username}'s profile
          </Link>
          <Link className="btn btn-lg btn-info m-2" to="/blog">
          {Auth.getProfile().data.username}'s Blog
          </Link>
          <button className="btn btn-lg btn-light m-2" onClick={logout}>
            Logout
          </button>
        </>
      );
    }
    // If logged out show login controls
    return (
      <>
        <Link className="" to="/login">
          Login
        </Link>
        <Link className="" to="/signup">
          Signup
        </Link>
      </>
    )
  };

  return (
    <header className="bg-light text-dark mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-dark" to="/">
            <h1 className="title">Bullrun</h1>
          </Link>
        </div>
        <div>
          <p className="m-0 text-center">Stock Market Trading Simulator</p>
          {renderControls()}
        </div>
      </div>
    </header>
  );
};

export default Header;
