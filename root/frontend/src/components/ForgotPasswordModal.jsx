import React, { useState } from 'react';
import axios from 'axios';

import '../style/ForgotPasswordModal.css';
import '../style/Loading.css';

function ForgotPasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post('/api/v1/users/forgotPassword', {
        email: email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      return;
    }

    setIsLoading(false);

    console.log('Resetting password...');
    handleCloseModal();
  };

  if (isLoading) {
    return <div className="loading-animation"></div>;
  }

  return (
    <>
      <p onClick={handleOpenModal} className="loginPage__form--forgotPassword">
        Forgot Password?
      </p>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Reset Password</h2>
            <p>Do you want to reset your password?</p>
            <p>
              An email with the password reset steps will be sent to your email
              address.
            </p>
            <div className="modal-form">
              <input
                type="email"
                placeholder="Email"
                className="email-input"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="modal-actions">
              <button
                className="reset-password-btn"
                onClick={handleResetPassword}
              >
                Send Reset Password Email
              </button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPasswordModal;
