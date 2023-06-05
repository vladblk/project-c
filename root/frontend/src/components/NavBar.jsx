import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import Cart from './Cart';
import axios from 'axios';

import '../style/NavBar.css';
import '../style/Loading.css';

function NavBar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-animation"></div>
      </div>
    );
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = async () => {
    try {
      await axios.get('/api/v1/users/signout', { withCredentials: true });
      setUser({});
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        Campy
      </a>
      <div>
        <Link to="/camps">
          <button className="navbar-button allCampsBtn">All Camps</button>
        </Link>
        <Link to="/products">
          <button className="navbar-button shopBtn">Shop</button>
        </Link>
      </div>
      <div className="navbar-buttons">
        {user.isLoggedIn ? (
          <>
            <div
              className="user-dropdown"
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
            >
              <span className="navbar-username">Welcome, {user.name}!</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/me">My Profile</Link>
                  <button onClick={handleLogOut}>Logout</button>
                </div>
              )}
            </div>
            <div className="cartBtn">
              <Cart />
              {cart.length > 0 && (
                <div className="cartNotification">{cart.length}</div>
              )}
            </div>
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
