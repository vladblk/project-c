import React from 'react';
import '../style/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Campy</div>
      <div className="navbar-buttons">
        <button className="navbar-button signInBtn">Sign In</button>
        <button className="navbar-button signUpBtn">Sign Up</button>
      </div>
    </nav>
  );
}

export default NavBar;
