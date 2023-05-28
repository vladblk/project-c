import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { CartContext } from '../CartContext';

import Cart from './Cart';
import '../style/NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, logout, userName } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  // return (
  //   <nav className="navbar">
  //     <a href="/" className="navbar-logo">
  //       Campy
  //     </a>
  //     <div>
  //       <Link to="/camps">
  //         <button className="navbar-button allCampsBtn">All Camps</button>
  //       </Link>
  //       <Link to="/products">
  //         <button className="navbar-button shopBtn">Shop</button>
  //       </Link>
  //     </div>
  //     <div className="navbar-buttons">
  //       {isLoggedIn ? (
  //         <>
  //           <span className="navbar-username">Welcome, {userName}!</span>
  //           <div className="cartBtn">
  //             <Cart />
  //             {cart.length > 0 && (
  //               <div className="cartNotification">{cart.length}</div>
  //             )}
  //           </div>
  //           <button className="navbar-button signOutBtn" onClick={handleLogOut}>
  //             Sign Out
  //           </button>
  //         </>
  //       ) : (
  //         <>
  //           <Link to="/signin">
  //             <button className="navbar-button signInBtn">Sign In</button>
  //           </Link>

  //           <Link to="/signup">
  //             <button className="navbar-button signUpBtn">Sign Up</button>
  //           </Link>
  //         </>
  //       )}
  //     </div>
  //   </nav>

  // );

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
