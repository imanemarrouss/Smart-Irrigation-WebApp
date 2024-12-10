import React, { useState, useEffect } from 'react';
import { getAuth, signOut, updatePassword } from '@firebase/auth';
import md5 from 'md5';
import './UserProfile.css';
import { FaEdit, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';



const UserProfile = ({ setShowProfile }) => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const auth = getAuth();

  
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Déconnecté avec succès.');
      setShowProfile(false);
    } catch (error) {
      alert('Erreur lors de la déconnexion: ' + error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      await updatePassword(user, newPassword);
      alert('Mot de passe modifié avec succès !');
      setNewPassword('');
      setIsEditingPassword(false);
    } catch (error) {
      alert('Erreur lors de la modification du mot de passe: ' + error.message);
    }
  };

  const getGravatarUrl = (email) => {
    if (email) {
      const trimmedEmail = email.trim().toLowerCase();
      const hashedEmail = md5(trimmedEmail);
      return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon&r=g`;
    } else {
      return '';
    }
  };

  return (
    <div className="user-profile">
      {auth.currentUser ? (
        <div className="profile-container">
          <div className="profile-header">
            <img
              src={getGravatarUrl(auth.currentUser?.email || '')}
              alt="User Avatar"
              className="avatar"
            />
            <h2 className="welcome-message">Bienvenue, {auth.currentUser?.displayName || 'Utilisateur'}</h2>
            <p className="user-email">{auth.currentUser?.email}</p>
          </div>
          <div className="actions">
            <button className="edit-button" onClick={() => setIsEditingPassword(!isEditingPassword)}>
              <FaEdit /> Changer le mot de passe
            </button>
            {isEditingPassword && (
              <form onSubmit={handleChangePassword} className="password-form">
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    required
                    className="password-input"
                  />
                 
                </div>
                <button type="submit" className="save-button">Enregistrer</button>
              </form>
            )}
          </div>
          <div className="theme-actions">
            <button className="theme-toggle" onClick={() => setIsDarkTheme(!isDarkTheme)}>
              {isDarkTheme ? <FaMoon /> : <FaSun />}
            </button>
            <button className="sign-out" onClick={handleSignOut}>
              <FaSignOutAlt /> Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre profil.</p>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  setShowProfile: PropTypes.func.isRequired, // Validate setShowProfile as a required function
};

export default UserProfile;
