import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import MyPageSettings from './MyPageSettings';
import MyAdminPageAddCamp from './MyAdminPageAddCamp';
import MyAdminPageEditCamp from './MyAdminPageEditCamp';
import MyAdminPageAddProduct from './MyAdminPageAddProduct';
import MyAdminPageEditProduct from './MyAdminPageEditProduct';
import MyAdminPageReports from './MyAdminPageReports';
import { AuthContext } from '../AuthContext';

import '../style/MyPage.css';

function MyPage() {
  const [activeItem, setActiveItem] = useState('settings');
  const { user } = useContext(AuthContext);

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
            {user.role === 'admin' && (
              <>
                <li
                  className={activeItem === 'admin-add-camp' ? 'active' : ''}
                  onClick={() => handleItemClick('admin-add-camp')}
                >
                  Add Camp
                </li>
                <li
                  className={activeItem === 'admin-edit-camp' ? 'active' : ''}
                  onClick={() => handleItemClick('admin-edit-camp')}
                >
                  Edit Camp
                </li>
                <li
                  className={activeItem === 'admin-add-product' ? 'active' : ''}
                  onClick={() => handleItemClick('admin-add-product')}
                >
                  Add Product
                </li>
                <li
                  className={
                    activeItem === 'admin-edit-product' ? 'active' : ''
                  }
                  onClick={() => handleItemClick('admin-edit-product')}
                >
                  Edit Product
                </li>
                <li
                  className={activeItem === 'admin-reports' ? 'active' : ''}
                  onClick={() => handleItemClick('admin-reports')}
                >
                  Reports
                </li>
              </>
            )}
            {/* Add more menu items here */}
          </ul>
        </div>
        <div className="me-page-content">
          {activeItem === 'settings' && <MyPageSettings />}
          {activeItem === 'admin-add-camp' && <MyAdminPageAddCamp />}
          {activeItem === 'admin-edit-camp' && <MyAdminPageEditCamp />}
          {activeItem === 'admin-add-product' && <MyAdminPageAddProduct />}
          {activeItem === 'admin-edit-product' && <MyAdminPageEditProduct />}
          {activeItem === 'admin-reports' && <MyAdminPageReports />}
          {/* Add more sections/components for other menu items */}
        </div>
      </div>
    </>
  );
}

export default MyPage;
