// import React from 'react';
// import PropTypes from 'prop-types';  // Import PropTypes
// import SideBar from '../component/SideBar';
// import UserProfile from '../component/Login/UserProfile';
// import { Outlet } from 'react-router-dom';

// const MainLayout = ({ showProfile, setShowProfile, handleShowProfile, handleReturnToPreviousPage }) => {
//   return (
//     <div id="app-container" className="app-navigator-container">
//       <SideBar 
//         setShowProfile={setShowProfile} 
//         showProfile={showProfile} 
//         handleShowProfile={handleShowProfile} 
//       />
//       <div style={{ flex: 1, padding: '0px' }}>
//         {showProfile ? (
//           <UserProfile setShowProfile={setShowProfile} handleReturnToPreviousPage={handleReturnToPreviousPage} />
//         ) : (
//           <Outlet />
//         )}
//       </div>
//     </div>
//   );
// };

// // Define the expected types for the props
// MainLayout.propTypes = {
//   showProfile: PropTypes.bool.isRequired,
//   setShowProfile: PropTypes.func.isRequired,
//   handleShowProfile: PropTypes.func.isRequired,
//   handleReturnToPreviousPage: PropTypes.func.isRequired
// };

// export default MainLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dash/Dashboard'; // Sidebar Component

const MainLayout = ({ showProfile, setShowProfile, handleShowProfile, handleReturnToPreviousPage }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar (Dashboard) */}
      <Dashboard />
      
      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}> {/* Adjust margin for sidebar width */}
        <Outlet /> {/* Renders child routes */}
      </div>
    </div>
  );
};


export default MainLayout;
