import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
    return (
        <div>
            <style>{`
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background: #e8f5e9;
                }

                .contain {
                    font-family: 'Roboto', sans-serif;
                    color: #444;
                    background-color: #d7f5e1;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    
                   
                }

                .header {
                    text-align: center;
                    padding: 40px 0;
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 8px 8px 0 0;
                    position: relative;
                    overflow: hidden;
                }

                .header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 0 0 8px 8px;
                }

                .header h1 {
                    margin: 0;
                    font-size: 3em;
                    animation: fadeIn 1s ease;
                }

                .header p {
                    font-size: 1.5em;
                    margin-top: 10px;
                    animation: fadeIn 1s ease 0.5s forwards;
                }

                .section {
                    padding: 30px 0;
                    border-bottom: 1px solid #ddd;
                }

                .section:last-child {
                    border: none;
                }

                .mission h2, .values h2, .history h2, .team h2 {
                    text-align: center;
                    font-size: 2.5em;
                    color: #2e7d32; /* Couleur verte pour les titres */
                    margin: 20px 0;
                    position: relative;
                }

                .mission h2::after, .values h2::after, .history h2::after, .team h2::after {
                    content: '';
                    display: block;
                    width: 50px;
                    height: 4px;
                    background: #4CAF50;
                    margin: 10px auto;
                    border-radius: 2px;
                }

                .button {
                    display: inline-block;
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s, transform 0.3s;
                    margin-top: 15px;
                }

                .button:hover {
                    background-color: #45a049;
                    transform: translateY(-2px);
                }

                .valuesGrid {
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                }

                .value {
                    text-align: center;
                    flex: 1;
                    padding: 20px;
                    margin: 0 10px;
                    color: black;
                    border-radius: 5px;
                    background-color: #f1f1f1; /* Couleur de fond douce pour les valeurs */
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s;
                }

                .value:hover {
                    transform: translateY(-5px);
                }

                .teamGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }

                .teamMember {
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }

                .teamMember:hover {
                    transform: translateY(-3px);
                }

                .footer {
                    background-color: #f1f1f1;
                    padding: 20px;
                    text-align: center;
                    border-radius: 0 0 8px 8px;
                    margin-top: 20px;
                }

                .quickLinks a, .socialMedia a {
                    margin: 0 10px;
                    color: #444;
                    text-decoration: none;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <div className="contain">
                <header className="header">
                    <h1>Qui sommes-nous ?</h1>
                    <p>Nabta - Gérer votre jardin, cultiver votre passion</p>
                    <Link to="/contact" className="button">Contactez-nous</Link>
                </header>
                
                <section className="section mission">
                    <h2>Notre mission</h2>
                    <p>Nous aidons les passionnés de jardinage à gérer leurs jardins de manière durable et efficace.</p>
                </section>

                <section className="section values">
                    <h2>Nos Valeurs</h2>
                    <div className="valuesGrid">
                        <div className="value">
                            <h3>Innovation</h3>
                            <p>Utilisation de technologies modernes pour un jardinage efficace.</p>
                        </div>
                        <div className="value">
                            <h3>Durabilité</h3>
                            <p>Engagement envers des pratiques respectueuses de l'environnement.</p>
                        </div>
                        <div className="value">
                            <h3>Communauté</h3>
                            <p>Création d'un réseau de jardiniers partageant leurs connaissances.</p>
                        </div>
                    </div>
                </section>

                <section className="section history">
                    <h2>Notre Histoire</h2>
                    <p>Depuis notre création, nous avons transformé des jardins et contribué à la biodiversité. Voici quelques jalons clés :</p>
                    <ul>
                        <li>2015 : Création de Nabta</li>
                        <li>2017 : Lancement de notre application de gestion des jardins</li>
                        <li>2020 : Partenariats avec des agriculteurs locaux</li>
                    </ul>
                </section>

                <section className="section team">
                    <h2>Notre Équipe</h2>
                    <div className="teamGrid">
                        <div className="teamMember">
                            <h3>Jane Doe</h3>
                            <p>Experte en horticulture</p>
                        </div>
                        <div className="teamMember">
                            <h3>John Smith</h3>
                            <p>Ingénieur en agriculture durable</p>
                        </div>
                        {/* Ajoutez d'autres membres de l'équipe ici */}
                    </div>
                </section>

                <footer className="footer">
                    <div className="quickLinks">
                        <a href="/contact">Contact</a>
                        <a href="/privacy-policy">Politique de confidentialité</a>
                        <a href="/terms">Mentions légales</a>
                    </div>
                    <div className="socialMedia">
                        <a href="https://facebook.com">Facebook</a>
                        <a href="https://linkedin.com">LinkedIn</a>
                        <a href="https://twitter.com">Twitter</a>
                    </div>
                    <p>Adresse et Contact</p>
                </footer>
            </div>
        </div>
    );
};

export default About;
