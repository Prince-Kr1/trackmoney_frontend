import React, { useContext, useState } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal';

const SideMenu = () => {
  
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, logoutUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutDialog(true);
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    logoutUser();
    navigate('/login');
  };
  

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="w-60 h-[calc(100vh-56px)] bg-white border-r border-gray-200 p-3 sticky top-[56px] z-20 shadow-md">
      {/* User Info */}
      <div className="flex flex-col items-center text-center mt-6 mb-8">
        <h3 className="text-gray-900 text-base font-semibold tracking-tight">
          {user?.username || 'Guest User'}
        </h3>
        <p className="text-gray-500 text-sm mt-0.5">
          {user?.email || ''}
        </p>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-[15px] py-3 px-5 rounded-lg transition-all duration-150
              ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-900 hover:bg-gray-100 hover:text-primary'
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon
              className={`text-xl ${isActive(item.path) ? 'text-white' : 'text-gray-900'}`}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {showLogoutDialog && (
        <LogoutModal
          onCancel={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
        />
      )}

    
    </div>
)};

export default SideMenu;
