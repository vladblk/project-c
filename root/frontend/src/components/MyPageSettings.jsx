import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import ErrorBanner from './ErrorBanner';

function MyPageSettings() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  const handleSaveCredentialsChange = async () => {
    try {
      const response = await axios.patch(
        '/api/v1/users/updateMe',
        {
          name: name,
          email: email,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status === 200) {
        login(response.data.data.user.updatedUser);
        setName('');
        setEmail('');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      return;
    }
  };

  const handleSavePasswordChange = async () => {
    try {
      const response = await axios.patch(
        '/api/v1/users/changeMyPassword',
        {
          passwordCurrent: passwordCurrent,
          password: passwordNew,
          passwordConfirm: passwordConfirm,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status === 200) {
        setPasswordNew('');
        setPasswordCurrent('');
        setPasswordConfirm('');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      return;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        '/api/v1/users/deleteMe',
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);

      handleLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings-section">
      {error && <ErrorBanner message={error} />}
      <div className="settings-section-credentials">
        <h2>Change my credentials</h2>
        <form>
          <label className="myPage__settings--label">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="myPage__settings--input"
            />
          </label>
          <label className="myPage__settings--label">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="myPage__settings--input"
            />
          </label>
          <button
            type="button"
            className="myPage__settings--btn"
            onClick={handleSaveCredentialsChange}
          >
            Update credentials
          </button>
        </form>
      </div>
      <div className="settings-section-password">
        <h2>Change my password</h2>
        <form>
          <label className="myPage__settings--label">
            Current Password:
            <input
              type="password"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
              className="myPage__settings--input"
            />
          </label>
          <label className="myPage__settings--label">
            New Password:
            <input
              type="password"
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
              className="myPage__settings--input"
            />
          </label>
          <label className="myPage__settings--label">
            New Password Confirm:
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="myPage__settings--input"
            />
          </label>
          <button
            type="button"
            onClick={handleSavePasswordChange}
            className="myPage__settings--btn"
          >
            Change password
          </button>
        </form>
      </div>

      <div className="settings-section-deleteAccount">
        <h2>Delete my account</h2>
        <form>
          <p className="myPage__settings--label">
            To delete your account, please click on the button below!
          </p>
          <button
            type="button"
            className="myPage__settings--btn deleteMeBtn"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyPageSettings;
