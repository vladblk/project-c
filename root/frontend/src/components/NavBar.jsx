import React from 'react';
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
      <a href="/" className="navbar-logo">
        Campy
      </a>
      <div className="navbar-buttons">
        <Link to="/camps">
          <button className="navbar-button allCampsBtn">All Camps</button>
        </Link>
        <Link to="/products">
          <button className="navbar-button shopBtn">Shop</button>
        </Link>
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
