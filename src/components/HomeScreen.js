import React from 'react';
import Navbar from './Navbar';
import Header from './Header'; // Assurez-vous d'importer le composant Header
import TopPicks from './TopPicks'; // Assurez-vous d'importer le composant TopPicks
import Footer from './Footer'; // Assurez-vous d'importer le composant Footer

const HomeScreen = () => {
  const styles = {
    homeContainer: {
      backgroundColor: '#d7f5e1', // Couleur de fond pour toute la page
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centrage horizontal des éléments
      minHeight: '100vh', // S'assure que la page prend au moins toute la hauteur
      paddingBottom: '20px', // Ajout d'un padding au bas pour espacer les éléments
      justifyContent: 'space-between', // Espacement entre les éléments
    },
  };

  return (
    <div style={styles.homeContainer}> 
      <Navbar />
      <Header />
      <TopPicks />
      <Footer />
    </div>
  );
};

export default HomeScreen;
