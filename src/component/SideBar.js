import React, { useState } from 'react';
import './SideBar.css';
import { FaUsers, FaMoneyBill, FaCalendarAlt, FaCog, FaUser, FaHistory } from 'react-icons/fa';
import { getAuth } from '@firebase/auth';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SideBar = ({ setShowProfile, showProfile, handleShowProfile }) => {
  const auth = getAuth();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const getGravatarUrl = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hashedEmail = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon&r=g`;
  };

  const navItems = [
    { icon: <FaUser />, label: 'Account', onClick: () => handleShowProfile(window.location.pathname) },
    { icon: <FaUsers />, label: 'Contacts' },
    { icon: <FaMoneyBill />, label: 'Current Data' , onClick:() => navigate('/current-data')},
    { icon: <FaCalendarAlt />, label: 'Calendar' },
    { icon: <FaCog />, label: 'Detect Disease' , onClick:() => navigate('/detect')},
    { icon: <FaHistory />, label: 'History of Irrigation', onClick: () => navigate('/history') }, // New History item
  ];

  return (
    <div
      className={`sidebar ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="user-section">
        <img
          src={getGravatarUrl(auth.currentUser?.email || '')}
          alt="User Avatar"
          className="avatar"
          onClick={() => handleShowProfile(window.location.pathname)} // Trigger profile with current page URL
        />
      </div>
      <div className="nav-links">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onClick={item.onClick}
          >
            {item.icon}
            {isHovered && <span className="nav-label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
