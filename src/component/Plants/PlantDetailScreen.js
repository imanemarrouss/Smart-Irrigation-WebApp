import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref as dbRef, remove, get } from 'firebase/database';
import './PlantDetailScreen.css';
import { getAuth } from "firebase/auth";

const PlantDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state?.plant;

  const [isEditing, setIsEditing] = useState(false);
  const [editedPlant, setEditedPlant] = useState(plant);

  if (!plant) {
    return (
      <div className="error-container-edit">
        <h2 className="error-text-edit">Détails de la plante non disponibles.</h2>
      </div>
    );
  }

  const renderDetailItem = (label, value, field) => (
    <div className="detail-item-edit">
      <span className="detail-label-edit">{label}:</span>
      {isEditing ? (
        <input
          type="text"
          id={`input-${field}`}
          data-testid={`input-${field}`}
          value={value}
          onChange={(e) => setEditedPlant({ ...editedPlant, [field]: e.target.value })}
          className="detail-input-edit"
        />
      ) : (
        <span 
        id={`value-${field}`} // ID unique pour chaque valeur
        data-testid={`value-${field}`} // data-testid pour les tests
        className="detail-value-edit">{value || 'Non spécifié'}</span>
      )}
    </div>
  );

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette plante ?')) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          alert('Utilisateur non connecté. Veuillez vous connecter pour supprimer une plante.');
          return;
        }
  
        const userId = user.uid; // Get the current user's ID
  
        // Correct reference path for user-specific plants
        const db = getDatabase();
        const plantRef = dbRef(db, `plants/${userId}/${plant.id}`);
  
        const snapshot = await get(plantRef);
        if (!snapshot.exists()) {
          alert('Cette plante n\'existe pas dans la base de données.');
          return;
        }
  
        // Remove the plant from the database
        await remove(plantRef);
        alert('Plante supprimée avec succès !');
        navigate('/home-screen-plants');
      } catch (error) {
        console.error('Erreur lors de la suppression de la plante:', error);
        alert('Impossible de supprimer la plante : ' + error.message);
      }
    }
  };
  
  const renderIrrigationState = () => (
    <div className="detail-item-edit">
      <span className="detail-label-edit">État de l'irrigation:</span>
      <span className="detail-value-edit">
        {plant.isIrrigated ? 'Irrigated' : 'Not Irrigated'}
      </span>
      {isEditing && (
        <select
          value={editedPlant.isIrrigated ? 'true' : 'false'}
          onChange={(e) =>
            setEditedPlant({ ...editedPlant, isIrrigated: e.target.value === 'true' })
          }
          className="detail-select-edit"
        >
          <option value="true">Irriguée</option>
          <option value="false">Non irriguée</option>
        </select>
      )}
    </div>
  );

  const handleSave = () => {
    // Logique pour sauvegarder les modifications dans la base de données
    console.log('Sauvegarder les modifications:', editedPlant);
    setIsEditing(false);
    // Vous pouvez ajouter ici la logique pour mettre à jour dans Firebase si nécessaire
  };


  return (
    <div className="container-edit">
      <div className="image-section-edit">
        <img
          src={plant.image || plant.firebaseUrl}
          alt={`Image de ${plant.name}`}
          className="plant-image-edit"
          onError={() => console.log("Erreur de chargement de l'image")}
        />
      </div>
      <div className="details-container-edit">
        {renderDetailItem('Nom', editedPlant.name, 'name')}
        {renderDetailItem('État', editedPlant.state, 'state')}
        {renderIrrigationState()}

        {renderDetailItem('Nom scientifique', editedPlant.scientificName, 'scientificName')}
        {renderDetailItem('Famille', editedPlant.family, 'family')}
        {renderDetailItem('Genre', editedPlant.genus, 'genus')}

        <div className="action-buttons-edit">
          {isEditing ? (
            <>
              <button className="action-button-edit" data-testid="save-button" onClick={handleSave}>
                Sauvegarder
              </button>
              <button className="action-button-edit" data-testid="cancel-button" onClick={() => setIsEditing(false)}>
                Annuler 
              </button>
            </>
          ) : (
            <>
              <button className="action-button-edit" data-testid="edit-button"  onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} className="icon-edit" />
              </button>
              <button className="action-button-edit" data-testid="delete-button" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="icon-delete" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetailScreen;