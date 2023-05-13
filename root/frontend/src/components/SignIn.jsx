import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import NavBar from './NavBar';

import '../style/SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email} | Password: ${password}`);

    try {
      const response = await axios.post(
        '/api/v1/users/signin',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      login(response.data.data.user.name);
      console.log(response);
      // console.log(cookies);
    } catch (error) {
      console.log(error);
    }

    navigate('/camps');
  };

  return (
    <>
      <NavBar />
      <div className="loginPage">
        <h1 className="loginPage__title">Sign in</h1>
        <form className="loginPage__form" onSubmit={handleSubmit}>
          <label className="loginPage__form--email-label">
            Email:
            <input
              className="loginPage__form--email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label className="loginPage__form--password-label">
            Password:
            <input
              className="loginPage__form--password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button
            className="loginPage__form--submitBtn"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <Link className="loginPage__form--cancelBtn" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
