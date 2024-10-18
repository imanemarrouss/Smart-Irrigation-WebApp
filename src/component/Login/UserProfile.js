import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged, updatePassword } from '@firebase/auth';
import md5 from 'md5';

const UserProfile = ({ history }) => {
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, history]);

  const handleSignOut = async () => {
    await signOut(auth);
    history.push('/login');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const getGravatarUrl = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hashedEmail = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        alert('Password changed successfully!');
        setNewPassword('');
        setEditingPassword(false);
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('No user is logged in.');
    }
  };

  const handleSaveNotificationPreferences = () => {
    alert(`Notifications ${notificationsEnabled ? 'enabled' : 'disabled'}.`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordEdit = () => {
    setEditingPassword((prev) => !prev);
  };

  if (!user) {
    return null; // You can return a loader here.
  }

  return (
    <div className={`container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className={`profile-container ${isDarkTheme ? 'dark' : 'light'}`}>
        <img src={getGravatarUrl(user.email)} alt="User Profile" className="profile-image" />
        <p className="username">{user.displayName || 'Username'}</p>
        <p className="email">{user.email}</p>
      </div>

      <div className="settings-container">
        <button className="btn" onClick={togglePasswordEdit}>
          Change Password
        </button>

        {isEditingPassword && (
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <button onClick={handleChangePassword}>Save</button>
          </div>
        )}

        <div className="notification-settings">
          <button className="btn" onClick={handleSaveNotificationPreferences}>
            Notification Preferences
          </button>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled((prev) => !prev)}
          />
        </div>
      </div>

      <div className="theme-container">
        <p>Change Theme</p>
        <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
      </div>

      <button className="btn sign-out" onClick={handleSignOut}>
        Sign Out
      </button>

      {/* Add some extra content to test scrolling */}
      <div className="extra-content">
        <p>Extra content for scrolling:</p>
        {[...Array(20)].map((_, index) => (
          <p key={index}>Item {index + 1}</p>
        ))}
      </div>
    </div>
  );
};

// Example of minimal CSS styles (replace with an external stylesheet for better practices)
const cssStyles = `
  .container {
    padding: 16px;
    background-color: #E5F9E0;
  }
  .dark-theme {
    background-color: #2E3A2A;
    color: white;
  }
  .profile-container {
    text-align: center;
  }
  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  .sign-out {
    background-color: #f44336;
  }
  .password-container, .notification-settings, .theme-container {
    margin: 10px 0;
  }
  .extra-content {
    margin-top: 20px;
  }
`;

// Add this style dynamically (for quick prototyping)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = cssStyles;
document.head.appendChild(styleSheet);

export default UserProfile;
