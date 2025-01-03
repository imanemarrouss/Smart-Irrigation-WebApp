import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import './HomeScreenPlants.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const HomeScreenPlants = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserId(user.uid); // Set the user ID from Firebase Auth
      loadPlants(user.uid); // Pass the user ID to loadPlants
    } else {
      console.error('No user is signed in.');
      alert('Please sign in to view your plants.');
      navigate('/login'); // Redirect to login screen if no user
    }
  }, []);

  // Load plants (filtered by user)
  const loadPlants = (userId) => {
    const localPlants = loadLocalPlants(userId);
    loadFirebasePlants(userId, localPlants);
  };

  // Load user-specific plants from local storage
  const loadLocalPlants = (userId) => {
    const keys = Object.keys(localStorage);
    const userPlantKeys = keys.filter(key => key.startsWith(`plant-${userId}-`));
    const loadedPlants = userPlantKeys.map(key => {
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
        return null;
      }
    }).filter(plant => plant !== null);
    return loadedPlants;
  };

  // Load user-specific plants from Firebase
  const loadFirebasePlants = (userId, localPlants) => {
    const db = getDatabase();
    const plantsRef = ref(db, `plants/${userId}`);


    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val();
      const firebasePlants = data
        ? Object.values(data).map(plant => ({
            id: plant.id,
            name: plant.name,
            image: plant.firebaseUrl,
            state: plant.state,
            family: plant.identification.family,
            genus: plant.identification.genus,
            scientificName: plant.identification.scientificName,
          }))
        : [];

      const allPlants = [...localPlants, ...firebasePlants];
      setPlants(allPlants);
    }, (error) => {
      console.error('Error fetching plants from Firebase:', error);
      alert('Error fetching plants from Firebase: ' + error.message);
    });
  };

  const renderPlantItem = (plant) => (
    // <div
    //   className="plant-item"
    //   key={plant.id}
    //   onClick={() => navigate(`/plant-detail-screen/${plant.id}`, { state: { plant } })}
    // >
    <div
  className="plant-item"
  key={plant.id}
  role="button"
  tabIndex={0} // Makes the div focusable with Tab key
  onClick={() => navigate(`/plant-detail-screen/${plant.id}`, { state: { plant } })}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate(`/plant-detail-screen/${plant.id}`, { state: { plant } });
    }
  }}
  aria-label={`View details for ${plant.name}`} // Add meaningful label for accessibility
>
  

      <img src={plant.image} alt={plant.name} className="plant-image" />
      <h3 className="plant-name">{plant.name}</h3>
    </div>
  );

  return (
    <div className="homescreencontainer">
      {plants.length === 0 ? (
        <div className="empty-container">
          <div className="icone_home"></div>
          <h3 className="message">Vous n'avez pas encore de plantes.</h3>
          <p className="message">Ajoutez votre première plante dès maintenant !</p>
        </div>
      ) : (
        <div className="plants-list">
          {plants.map(renderPlantItem)}
        </div>
      )}
      <button className="add-button" onClick={() => navigate('/add-plants-screen')}>
  <FontAwesomeIcon icon={faPlus} size="2x" />
</button>
    </div>
  );
};

export default HomeScreenPlants;
