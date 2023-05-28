import React, { useState } from 'react';

import NavBar from './NavBar';
import MyPageSettings from './MyPageSettings';

import '../style/MyPage.css';

function MyPage() {
  const [activeItem, setActiveItem] = useState('settings');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <NavBar />
      <div className="me-page">
        <div className="me-page-menu">
          <ul>
            <li
              className={activeItem === 'settings' ? 'active' : ''}
              onClick={() => handleItemClick('settings')}
            >
              Settings
            </li>
            {/* Add more menu items here */}
          </ul>
        </div>
        <div className="me-page-content">
          {activeItem === 'settings' && <MyPageSettings />}
          {/* Add more sections/components for other menu items */}
        </div>
      </div>
    </>
  );
}

export default MyPage;
