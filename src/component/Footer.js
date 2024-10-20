import React from 'react';
import logo from '../assets/nabta.png';

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row bg-[#d7f5e1] items-center justify-between p-6 lg:p-12 w-full bg-transparent">
      {/* Section Logo */}
      <div className="flex-shrink-0 mb-6 lg:mb-0">
        <img src={logo} alt="Nabta Logo" className="h-20 lg:h-32" /> {/* Taille ajustée pour mobile et desktop */}
      </div>

      {/* Liens organisés en colonnes */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-28"> {/* Colonnes empilées sur mobile */}
        
        {/* Première colonne */}
        <div className="flex flex-col space-y-2 items-center lg:items-start">
          <a href="#" className="text-black hover:text-green-600">Team</a>
          <a href="#" className="text-black hover:text-green-600">Gardening</a>
          <a href="#" className="text-black hover:text-green-600">Edible</a>
        </div>

        {/* Deuxième colonne */}
        <div className="flex flex-col space-y-2 items-center lg:items-start">
          <a href="#" className="text-black hover:text-green-600">Services</a>
          <a href="#" className="text-black hover:text-green-600">Projects</a>
          <a href="#" className="text-black hover:text-green-600">Affiliate</a>
        </div>

        {/* Troisième colonne */}
        <div className="flex flex-col space-y-2 items-center lg:items-start">
          <a href="#" className="text-black hover:text-green-600">Terms of use</a>
          <a href="#" className="text-black hover:text-green-600">Privacy Policy</a>
          <a href="#" className="text-black hover:text-green-600">Contact us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
