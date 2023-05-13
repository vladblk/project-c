import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import '../style/NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, userName } = useAuth();

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Campy</div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">Welcome, {userName}!</span>
            <button className="navbar-button signOutBtn" onClick={handleLogOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="navbar-button signInBtn">Sign In</button>
            </Link>

            <Link to="/signup">
              <button className="navbar-button signUpBtn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
