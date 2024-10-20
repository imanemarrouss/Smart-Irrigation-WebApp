import React from 'react';
import image from '../../assets/Rectangle 12.png'
const RefHeader = () => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh', // Assure que l'en-tête occupe presque toute la hauteur de la fenêtre
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    enter: {
      textAlign: 'center',
      padding: '20px',
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      marginTop: '140px',
      marginBottom: '100px',
      background: 'rgba(255, 255, 255, 0.363)', // Fond blanc avec opacité
      outline: '10px solid rgb(9, 9, 9)',
    },
    h1: {
      fontSize: '2.5rem',
      color: '#4A9E3B', // Couleur verte
      fontWeight: 'bold',
    },
    p: {
      marginTop: '12px',
      color: '#4A4A4A',
      fontSize: '1.125rem',
      lineHeight: '1.6',
      margin: '0 auto',
    },
    button: {
      backgroundColor: '#4A9E3B', // Couleur de fond
      padding: '10px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold',
      marginTop: '20px',
      border: 'none',
      cursor: 'pointer',
    },
    // Styles responsifs
    responsiveMedium: {
      '@media (maxWidth: 768px)': {
        enter: {
          padding: '15px',
          maxWidth: '90%',
        },
        h1: {
          fontSize: '2rem',
        },
        p: {
          fontSize: '1rem',
          marginTop: '8px',
        },
        button: {
          padding: '8px 16px',
          marginTop: '15px',
        },
      },
    },
    responsiveSmall: {
      '@media (maxWidth: 480px)': {
        enter: {
          padding: '10px',
          maxWidth: '95%',
        },
        h1: {
          fontSize: '1.5rem',
        },
        p: {
          fontSize: '0.9rem',
        },
        button: {
          padding: '6px 12px',
        },
      },
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <div style={styles.enter}>
          <h1 style={styles.h1}>Our Special Domains</h1>
          <p style={styles.p}>
          Un « smart garden » est un jardin conçu de manière plus efficace et automatisée grâce à l’intégration de technologies modernes et de systèmes intelligents dans l’arrosage, l’éclairage et l’entretien. Ces technologies permettent d’optimiser l’entretien du jardin, de réduire la consommation d’eau et de mieux surveiller les plantes sans avoir à être physiquement présent.
            </p>
          <button style={styles.button} >Discover our special domains.</button>
        </div>
      </div>
    </div>
  );
};

export default RefHeader;
