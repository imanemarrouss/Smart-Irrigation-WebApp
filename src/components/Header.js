import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between bg-transparent mt-28 p-5">
      {/* Texte et bouton */}
      <div className="max-w-full lg:max-w-md mt-10 text-center lg:text-left  lg:pr-28">
        <h1 className="text-2xl lg:text-4xl text-black font-bold">
          Customize your place with the <b>best</b> possible plant solutions
        </h1>
        <p className="mt-5 text-white font-semibold text-lg lg:text-xl max-w-full lg:max-w-sm">
          Recommendations that are healthy and match your aesthetic
        </p>
        <button className="bg-[#74C69D] border-none py-3 px-6 text-white cursor-pointer rounded-lg mt-5 transition-transform hover:scale-105">
          Build your smart garden
        </button>
      </div>

      {/* Grille d'images */}
      <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0 max-w-md mx-auto lg:mx-0">
        <img 
          src='../../assets/Rectangle 9.png'
          alt="Plants 1" 
          className="w-full h-52 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <img 
          src='../../assets/Rectangle 10.png'
          alt="Plants 2" 
          className="w-full h-52 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <img 
          src='../../assets/Rectangle 12.png' 
          alt="Plants 3" 
          className="w-full h-52 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <img 
          src='../../assets/Rectangle 11.png' 
          alt="Plants 4" 
          className="w-full h-52 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

    </header>
  );
};

export default Header;
