import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, remove, get } from 'firebase/database'; // Import Firebase Database functions
import './EditPlantsScreen.css'; // Import CSS for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditPlantsScreen = () => {
  const navigate = useNavigate();
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [image, setImage] = useState(null);
  const [firebaseUrl, setFirebaseUrl] = useState('');
  const [identification, setIdentification] = useState(null);

  useEffect(() => {
    loadPlantDetails();
  }, [plantId]);

  const loadPlantDetails = async () => {
    try {
      const plantData = localStorage.getItem(plantId);
      if (plantData) {
        const plant = JSON.parse(plantData);
        setName(plant.name);
        setState(plant.state);
        setImage(plant.image);
        setFirebaseUrl(plant.firebaseUrl);
        setPlant(plant);
        setIdentification(plant.identification);
      }
    } catch (error) {
      console.error('Error loading plant details:', error);
    }
  };

  const updatePlant = async () => {
    try {
      const updatedPlant = { ...plant, name, state, image, firebaseUrl, identification };
      localStorage.setItem(plantId, JSON.stringify(updatedPlant));
      alert('Plante mise à jour avec succès !');
      navigate(-1); // Return to the previous page
    } catch (error) {
      console.error('Error updating plant:', error);
      alert('Impossible de mettre à jour la plante : ' + error.message);
    }
  };

  const performDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette plante ?')) {
      try {
        console.log(`Attempting to delete plant with ID: ${plantId}`);

        const db = getDatabase();
        const plantRef = dbRef(db, `plants/${plantId}`); // Adjust the path as necessary

        // Check if the plant exists
        const snapshot = await get(plantRef);
        if (!snapshot.exists()) {
          alert('Cette plante n\'existe pas dans la base de données.');
          return;
        }

        // Remove the plant from the database
        await remove(plantRef);
        alert('Plante supprimée avec succès !');

        // Redirect to home
        navigate('/home-screen-plants');
      } catch (error) {
        console.error('Error deleting plant:', error);
        alert('Impossible de supprimer la plante : ' + error.message);
      }
    }
  };

  const handlePickImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      await uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = async (file) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `plant-images/${plantId}.jpg`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setFirebaseUrl(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Impossible de télécharger l\'image : ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={image || firebaseUrl} alt="Plant" className="plant-image" />
        <input type="file" onChange={handlePickImage} />
      </div>
      <input
        type="text"
        placeholder="Nom de la plante"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="État de la plante"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="input"
      />
      {identification && (
        <div className="identification-container">
          <p><strong>Identification :</strong></p>
          <p>Nom scientifique : {identification.scientificName}</p>
          <p>Genre : {identification.genus}</p>
          <p>Famille : {identification.family}</p>
          <p>Noms communs : {identification.commonNames}</p>
        </div>
      )}
      <div className="button-container">
        <button onClick={updatePlant} className="update-button">
          <FontAwesomeIcon icon={faSave} /> Mettre à jour
        </button>
        <button onClick={performDelete} className="delete-button">
          <FontAwesomeIcon icon={faTrash} /> Supprimer
        </button>
      </div>
    </div>
  );
};

export default EditPlantsScreen;