import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use React Router for navigation
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase
import './HomeScreenPlants.css'; // Import CSS for styling

const HomeScreenPlants = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    loadPlants();
  }, []);

  // Load plants from local storage and Firebase
  const loadPlants = () => {
    const localPlants = loadLocalPlants();
    loadFirebasePlants(localPlants);
  };

  // Load plants from local storage
  const loadLocalPlants = () => {
    const keys = Object.keys(localStorage);
    const plantKeys = keys.filter(key => key.startsWith('plant-'));
    const loadedPlants = plantKeys.map(key => {
      try {
        const plantInfo = JSON.parse(localStorage.getItem(key));
        return {
          id: key,
          name: plantInfo.name,
          image: plantInfo.firebaseUrl,
          state: plantInfo.state,
          family: plantInfo.identification.family,
          genus: plantInfo.identification.genus,
          scientificName: plantInfo.identification.scientificName,
        };
      } catch (parseError) {
        console.error('Error parsing plant data:', key, parseError);
        return null; // Return null if parsing fails
      }
    }).filter(plant => plant !== null); // Filter out null entries
    return loadedPlants; // Return loaded plants
  };

  // Load plants from Firebase
  const loadFirebasePlants = (localPlants) => {
    const db = getDatabase();
    const plantsRef = ref(db, 'plants/');
    
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val();
      const firebasePlants = data ? Object.values(data).map(plant => ({
        id: plant.id,
        name: plant.name,
        image: plant.firebaseUrl,
        state: plant.state,
        family: plant.identification.family,
        genus: plant.identification.genus,
        scientificName: plant.identification.scientificName,
      })) : [];

      // Merge local and Firebase plants
      const allPlants = [...localPlants, ...firebasePlants];
      setPlants(allPlants);
    }, (error) => {
      console.error('Error fetching plants from Firebase:', error);
      alert('Error fetching plants from Firebase: ' + error.message);
    });
  };

  // Render each plant item
  const renderPlantItem = (plant) => (
    <a
      href={`/plant-detail-screen/${plant.id}`} // Use href for navigation
      className="plant-item"
      key={plant.id}
    >
      <img src={plant.image} alt={plant.name} className="plant-image" />
      <h3 className="plant-name">{plant.name}</h3>
    </a>
  );
  

  return (
    <div className="homescreencontainer">
      {plants.length === 0 ? (
        <div className="empty-container">
        <div className="icone_home"></div>
        <h3 className='message'>Vous n'avez pas encore de plantes.</h3>
        <p className='message'>Ajoutez votre première plante dès maintenant !</p>
    </div>
      ) : (
        <div className="plants-list">
          {plants.map(renderPlantItem)}
        </div>
      )}
      <button className="add-button" onClick={() => navigate('/add-plants-screen')}>
  <img src="src/components/Plants/add-item.png" alt="Add new plant" />
</button>

    </div>
  );
};

export default HomeScreenPlants;
