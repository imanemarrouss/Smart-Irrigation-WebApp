import React, { useState } from 'react';
import Navbar from './navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer
import AskQuestion from './Rag/AskQuestion';
import './SubDomain.css'; // External CSS for better card styling
import '@fortawesome/fontawesome-free/css/all.min.css';

const SubDomain = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');

    // Function to handle card click
    const handleCardClick = (domain) => {
        setSelectedDomain(domain);
        setShowChatbot(true); // Show the chatbot when a domain is clicked
    };
    const styles = {
        homeContainer: {
          backgroundColor: '#d7f5e1', // Couleur de fond pour toute la page
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centrage horizontal des éléments
          minHeight: '100vh', // S'assure que la page prend au moins toute la hauteur
          paddingBottom: '20px', // Ajout d'un padding au bas pour espacer les éléments
          justifyContent: 'space-between', // Espacement entre les éléments
          backgroundColor:'#2d6a4f',
        },
        h1: {
            fontSize: '2.5rem',
            color: '#4A9E3B', // Couleur verte
            fontWeight: 'bold',
            marginTop:'10px',
            
          },
      };




    return (
        <div style={styles.homeContainer}>
            <Navbar />
            
            <h1 style={styles.h1}>Our Special Domains</h1>
            <div className="subdomain-container">
                
                <div className="card" onClick={() => handleCardClick('Irrigation')}>
                    <div className="card-image"></div>
                    <h2 className="domain">Irrigation</h2>
                    <p className="description">
                        Learn more about irrigation techniques, water management, and smart irrigation solutions.
                    </p>
                </div>

                <div className="card" onClick={() => handleCardClick('Soil Health')}>
                    <div className="card-image"></div>
                    <h2 className="domain">Soil Health</h2>
                    <p className="description">
                        Explore soil health management, fertility, and practices to enhance crop growth.
                    </p>
                </div>

                {/* Add the third card */}
                <div className="card" onClick={() => handleCardClick('Pest Control')}>
                    <div className="card-image"></div>
                    <h2 className="domain">Pest Control</h2>
                    <p className="description">
                        Understand pest control techniques and sustainable solutions to protect your crops.
                    </p>
                </div>

                {/* Chatbot Modal */}
                {showChatbot && (
                    <div className="chatbot-modal z-20">
                        <div className="chatbot-content">
                        <button className="close-btn" onClick={() => setShowChatbot(false)}>
                            <i className="fas fa-times"></i> {/* FontAwesome close icon */}
                        </button>                     
                   <h3>{selectedDomain} Information</h3>
                            <p>Ask any specific questions about {selectedDomain}:</p>
                            <AskQuestion />
                        </div>
                    </div>
                )}
            </div>

            {/* Add the Footer */}
           
        </div>
        
    );
};

export default SubDomain;
