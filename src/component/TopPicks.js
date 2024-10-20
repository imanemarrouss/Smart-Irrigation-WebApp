import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importe le CSS du carrousel
import logo1 from '../assets/Rectangle 9.png';
import logo2 from '../assets/Rectangle 10.png';
import logo3 from '../assets/Rectangle 12.png';
import logo4 from '../assets/Rectangle 11.png';

const TopPicks = () => {
  // Styles inline pour la section "Top Picks"
  const topPicksSectionStyle = {
    textAlign: 'center',
    margin: '50px 0',
  };

  const topPicksTitleStyle = {
    fontSize: '28px',
    margin: '50px 0px',
    color:'black'
  };

  const imageStyle = {
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const carouselItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 10px', // Ajoute un margin horizontal entre les images
  };

  return (
    <section style={topPicksSectionStyle}>
      {/* Ligne horizontale au-dessus */}
      <hr className="w-[75%] mx-auto border-black border-2 rounded-full my-5" />
      <h2 style={topPicksTitleStyle}><b>Top</b> Picks</h2>
      <Carousel
        autoPlay // Activer le défilement automatique
        infiniteLoop // Boucle infinie
        showThumbs={false} // Masquer les vignettes
        showStatus={false} // Masquer le statut
        showIndicators={true} // Afficher les indicateurs
        interval={3000} // Intervalle de défilement
        transitionTime={500} // Temps de transition
        centerMode={true} // Mode centré
        centerSlidePercentage={33.33} // Pourcentage de la largeur pour le slide central
        className="sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto" // Largeur ajustée selon la taille de l'écran
      >
        <div style={carouselItemStyle}>
          <img 
            src={logo1} 
            alt="Top Pick 1" 
            style={imageStyle} 
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px]" // Hauteur ajustée pour mobile et desktop
          />
        </div>
        <div style={carouselItemStyle}>
          <img 
            src={logo2} 
            alt="Top Pick 2" 
            style={imageStyle} 
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px]"
          />
        </div>
        <div style={carouselItemStyle}>
          <img 
            src={logo3} 
            alt="Top Pick 3" 
            style={imageStyle} 
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px]"
          />
        </div>
        <div style={carouselItemStyle}>
          <img 
            src={logo4} 
            alt="Top Pick 4" 
            style={imageStyle} 
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px]"
          />
        </div>
      </Carousel>
      {/* Ligne horizontale en dessous */}
      <hr className="w-[75%] mx-auto border-black border-2 rounded-full my-24" />
    </section>
  );
};

export default TopPicks;
