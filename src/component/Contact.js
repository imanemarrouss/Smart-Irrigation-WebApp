import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import logo from '../assets/nabta.png'; // Assure-toi que le chemin vers ton logo est correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
 const  Contact = () => {
  const form = useRef();
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_yq8v0hf', 'template_gdn0qwy', form.current, {
        publicKey: 'r6aGxJ10u1blw2Sy0',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Le message est bien envoyé');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Erreur lors de l\'envoi du message');
        }
      );
  };

  // Styles en ligne
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#d7f5e1',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid #66bb6a',
  };

  const logoContainerStyle = {
    flex: '1',
    textAlign: 'left',
  };

  const formContainerStyle = {
    flex: '1',
    paddingLeft: '20px',
  };

  const logoStyle = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#388e3c',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    color: 'black',
  };

  const textAreaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#66bb6a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const returnButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#388e3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      {/* Section du logo */}
      <div style={logoContainerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>

      {/* Section du formulaire */}
      <div style={formContainerStyle}>
        <form ref={form} onSubmit={sendEmail}>
          <label style={labelStyle}>Nom</label>
          <input type="text" name="from_name" style={inputStyle} required />

          <label style={labelStyle}>Email</label>
          <input type="email" name="name" style={inputStyle} required />

          <label style={labelStyle}>Message</label>
          <textarea name="message" style={textAreaStyle} required />

          <input
            type="submit"
            value="Envoyer"
            style={submitButtonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#66bb6a')}
          />
        </form>

        {/* Bouton de retour à l'accueil */}
        <button
          style={returnButtonStyle}
          onClick={() => navigate('/')} // Redirige vers la page d'accueil
        >
           <FontAwesomeIcon icon={faHouse} />
        </button>
      </div>
    </div>
  );
};
export default Contact