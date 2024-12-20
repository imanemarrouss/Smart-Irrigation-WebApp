import React, { useState } from 'react';
import logo from '../assets/nabta.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-transparent to-gray-900 fixed top-0 w-full z-10 shadow-lg transition duration-300 ease-in-out mr-5">
      <div className="logo">
        <img src={logo} alt="Nabta Logo" className="h-16 transform transition duration-500 hover:scale-110" />
      </div>

      {/* Menu desktop */}
      <ul className="hidden md:flex space-x-10 text-white font-semibold text-lg">
        <li>
          <Link to="/home" className="hover:text-green-400 transition duration-300 ease-in-out">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-green-400 transition duration-300 ease-in-out">About Us</Link>
        </li>
        <li>
          <Link to="/referentiel" className="hover:text-green-400 transition duration-300 ease-in-out">Référentiel</Link>
        </li>
      </ul>

      {/* Sign Up Button for larger screens */}
      <div className="hidden md:flex">
        <Link to="/login" className="px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-400 transition duration-300 ease-in-out">
          Sign Up
        </Link>
      </div>

      {/* Hamburger icon for mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center space-y-4 py-4 text-white font-semibold text-lg">
          <li>
            <Link to="/home" className="hover:text-green-400 transition duration-300 ease-in-out">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-400 transition duration-300 ease-in-out">About Us</Link>
          </li>
          <li>
            <Link to="/referentiel" className="hover:text-green-400 transition duration-300 ease-in-out">Référentiel</Link>
          </li>
          <li>
            <Link to="/sign" className="px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-400 transition duration-300 ease-in-out">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
