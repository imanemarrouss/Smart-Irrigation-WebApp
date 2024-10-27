import React, { useState, useEffect } from 'react';
import { getAuth, signOut, updatePassword } from '@firebase/auth';
import md5 from 'md5';
import './UserProfile.css';

const UserProfile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // Ajouter ou retirer la classe "dark-theme" selon l'état isDarkTheme
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Déconnecté avec succès.');
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
    const trimmedEmail = email.trim().toLowerCase();
    const hashedEmail = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon&r=g`;
  };

  return (
    <div className="user-profile">
      <div className="rectangle-9">
        <div className="group-7">
          <img
            src={getGravatarUrl(auth.currentUser?.email || '')}
            alt="User Avatar"
            className="ellipse-1"
          />
          <div className="preview-profile">Bienvenue</div>
          <div className="user-email">{auth.currentUser?.email}</div>
        </div>
        <div className="group-8">
          <button className="change-password" onClick={() => setIsEditingPassword(!isEditingPassword)}>
            Changer le mot de passe
          </button>
          {isEditingPassword && (
            <form onSubmit={handleChangePassword}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                required
              />
              <button type="button" className="show-button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
              <button type="submit" className="save-button">Enregistrer</button>
            </form>
          )}
        </div>
        <div className="group-9">
          <button className="dark-mode" onClick={() => setIsDarkTheme(!isDarkTheme)}>
            {isDarkTheme ? 'Mode Clair' : 'Mode Sombre'}
          </button>
          <button className="sign-out" onClick={handleSignOut}>
            Se déconnecter
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;