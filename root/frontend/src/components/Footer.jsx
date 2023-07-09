import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../style/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="/about" className="footer-link">About Us</a>
        <a href="/contact" className="footer-link">Contact</a>
        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <a href="/terms-of-service" className="footer-link">Terms of Service</a>
      </div>
      <div className="footer-social-icons">
        <a href="#" className="social-icon">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon">
          <FaFacebook />
        </a>
        <a href="#" className="social-icon">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
