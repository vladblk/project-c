import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import NavBar from './NavBar';
import ErrorBanner from './ErrorBanner';

import '../style/SignUp.css';
import '../style/ErrorBanner.css';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmChange = (event) =>
    setPasswordConfirm(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        '/api/v1/users/signup',
        {
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
        {
          withCredentials: true,
        }
      );
      login(response.data.data.user.name);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      return;
    }

    navigate('/camps');
  };

  return (
    <>
      <NavBar />
      <div className="signupPage">
        <h1 className="signupPage__title">Sign up</h1>
        {error && <ErrorBanner message={error} />}
        <form className="signupPage__form" onSubmit={handleSubmit}>
          <label className="signupPage__form--name-label">
            Name:
            <input
              className="signupPage__form--name-input"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className="signupPage__form--email-label">
            Email:
            <input
              className="signupPage__form--email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label className="signupPage__form--password-label">
            Password:
            <input
              className="signupPage__form--password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label className="signupPage__form--passwordConfirm-label">
            Password Confirm:
            <input
              className="signupPage__form--passwordConfirm-input"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </label>
          <br />
          <button className="signupPage__form--submitBtn" type="submit">
            Sign in
          </button>
          <Link className="signupPage__form--cancelBtn" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
