import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer className="w-100 mt-auto bg-secondary">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
        <small className="footer">
          (2021) Bullrun - Team Final Countdown
        </small>
        <small className="footer">
          Published with the MIT license.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
