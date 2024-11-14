import React from 'react';
import SideBar from '../component/SideBar';
import UserProfile from '../component/Login/UserProfile';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ showProfile, setShowProfile, handleShowProfile, handleReturnToPreviousPage }) => {
  return (
    <div id="app-container" className="app-navigator-container">
      <SideBar 
        setShowProfile={setShowProfile} 
        showProfile={showProfile} 
        handleShowProfile={handleShowProfile} 
      />
      <div style={{ flex: 1, padding: '0px' }}>
        {showProfile ? (
          <UserProfile setShowProfile={setShowProfile} handleReturnToPreviousPage={handleReturnToPreviousPage} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
