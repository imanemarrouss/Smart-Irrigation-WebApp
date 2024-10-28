// NotFound.js
import React from 'react';
import logo from '../assets/nabta.png';

function NotFound() {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1>404 - Page Non Trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // La hauteur de l'écran pour centrer verticalement
    textAlign: 'center',
    color:'black',
    fontWeight:'bold',
  },
  logo: {
    width: '150px', // Ajustez la taille du logo selon vos besoins
    marginBottom: '20px',
  },
};

export default NotFound;
