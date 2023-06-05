import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
import NavBar from './NavBar';
import ErrorBanner from './ErrorBanner';

import '../style/ErrorBanner.css';
import '../style/SignIn.css';

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmChange = (event) =>
    setPasswordConfirm(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `/api/v1/users/resetPassword/${params.resetPasswordToken}`,
        {
          password: password,
          passwordConfirm: passwordConfirm,
        }
      );
      console.log(response);
      // login(response.data.data.user);
    } catch (error) {
      console.log(error);
      setError(`${error.response.data.message}`);
      return;
    }

    navigate('/camps');
  };

  return (
    <>
      <NavBar />

      <div className="loginPage">
        <h1 className="loginPage__title">Reset Password</h1>
        {error && <ErrorBanner message={error} />}
        <form className="loginPage__form" onSubmit={handleSubmit}>
          <label className="loginPage__form--password-label">
            Password:
            <input
              className="loginPage__form--password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label className="loginPage__form--password-label">
            Password Confirm:
            <input
              className="loginPage__form--password-input"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </label>
          <br />
          <button
            className="loginPage__form--submitBtn"
            type="submit"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
          <Link className="loginPage__form--cancelBtn" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
