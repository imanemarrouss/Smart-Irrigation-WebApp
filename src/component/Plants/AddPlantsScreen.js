// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref as dbRef, set } from 'firebase/database';
// import './AddPlantsScreen.css';
// import { v4 as uuidv4 } from 'uuid';
// import { database,storage } from '../../config/firebaseConfig';
// import { getAuth } from "firebase/auth";




// // Initialize Firebase
// //const app = initializeApp(firebaseConfig);
// //const storage = getStorage(app);
// //const db = getDatabase(app);

// const AddPlantsScreen = () => {
//   const [image, setImage] = useState(null);
//   const [plantName, setPlantName] = useState('');
//   const [plantState, setPlantState] = useState('');
//   const [plantFamily, setPlantFamily] = useState('');
//   const [plantGenus, setPlantGenus] = useState('');
//   const [plantScientificName, setPlantScientificName] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const [isIdentifying, setIsIdentifying] = useState(false);
//   const [isIdentified, setIsIdentified] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const navigate = useNavigate();
//   const { plantId } = useParams();
   
//   useEffect(() => {
//     if (plantId) {
//       loadPlantDetails();
//     }
//   }, [plantId]);

//   const loadPlantDetails = async () => {
//     try {
//       const plantData = localStorage.getItem(plantId);
//       if (plantData) {
//         const { name, localUri, state } = JSON.parse(plantData);
//         setPlantName(name);
//         setImage(localUri);
//         setPlantState(state || '');
//       }
//     } catch (error) {
//       console.error('Error loading plant details:', error);
//       alert('Error loading plant details.');
//     }
//   };

//   const pickImage = async () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setImage(file);
//         setIsIdentified(false);
//         setAlertMessage('');
//       }
//     };
//     input.click();
//   };

//   const uploadToFirebase = async (file) => {
//     const storageReference = storageRef(storage, `plants/${file.name}`);
//     await uploadBytes(storageReference, file);
//     return await getDownloadURL(storageReference);
//   };

// //   const identifyPlant = async () => {
// //     if (!image) {
// //       setAlertMessage('Please select an image before identifying the plant.');
// //       return;
// //     }
// //     setIsIdentifying(true);

// //     try {
// //       const form = new FormData();
// //       form.append('organs', 'auto');
// //       form.append('images', image);

// //       const response = await axios.post(
// //         'https://my-api.plantnet.org/v2/identify/all?api-key=2b10bw6ri0n8ysN3bRG4wQm2O',
// //         form,
// //         {
// //           headers: {
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         }
// //       );

// //       const plantMatch = response.data.results[0];
// //       const species = plantMatch?.species;
// // if (species) {
// //   setPlantScientificName(species.scientificNameWithoutAuthor || '');
// //   setPlantFamily(species.family?.scientificName || '');
// //   setPlantGenus(species.genus?.scientificName || '');
// //   setIsIdentified(true);
// //   setAlertMessage('');
// // } else {
// //   setAlertMessage('Identification failed. Unable to identify the plant.');
// // }

// //     } catch (error) {
// //       console.error('Error identifying plant:', error);
// //       setAlertMessage('An error occurred while identifying the plant.');
// //     } finally {
// //       setIsIdentifying(false);
// //     }
// //   };



// const identifyPlant = async () => {
//   if (!image) {
//     setAlertMessage('Please select an image before identifying the plant.');
//     return;
//   }
//   setIsIdentifying(true);

//   try {
//     const form = new FormData();
//     form.append('organs', 'auto');
//     form.append('images', image);

//     const response = await axios.post(
//       'https://my-api.plantnet.org/v2/identify/all?api-key=2b10YPdIHBVSQj47paSx0cu',
//       form,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     console.log(response.data); // Log the response for debugging

//     const plantMatch = response.data.results[0];
//     const species = plantMatch?.species;
//     if (species) {
//       setPlantScientificName(species.scientificNameWithoutAuthor || '');
//       setPlantFamily(species.family?.scientificName || '');
//       setPlantGenus(species.genus?.scientificName || '');
//       setIsIdentified(true);
//       setAlertMessage('');
//     } else {
//       setAlertMessage('Identification failed. Unable to identify the plant.');
//     }

//   } catch (error) {
//     console.error('Error identifying plant:', error);
//     setAlertMessage('An error occurred while identifying the plant: ' + error.response?.data?.message || error.message);
//   } finally {
//     setIsIdentifying(false);
//   }
// };




//   const savePlant = async () => {
//     if (!image || !plantName.trim() || !isIdentified) {
//       setAlertMessage('Veuillez sélectionner une image, entrer un nom de plante et l\'identifier avant de sauvegarder.');
//       return;
//     }
    
//     try {
//       setIsSaving(true);
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) {
//         setAlertMessage("User not authenticated.");
//         navigate('/login');
//         return;
//       }
//       const userId = user.uid;
  
//       const firebaseUrl = await uploadToFirebase(image);
      
//       const plantData = {
//         id: uuidv4(),
//         name: plantName.trim(),
//         firebaseUrl: firebaseUrl,
//         state: plantState,
//         identification: {
//           scientificName: plantScientificName,
//           family: plantFamily,
//           genus: plantGenus,
//         },
//       };
      
//       await set(dbRef(database, `plants/${userId}/${plantData.id}`), plantData);
      
//       setAlertMessage(`La plante "${plantName.trim()}" a été sauvegardée avec succès !`);
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde de la plante:', error);
//       setAlertMessage('Une erreur est survenue lors de la sauvegarde de la plante : ' + error.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };
  

//   return (
//     <div className="add-plant-container">
//       <h1 className="title">{plantId ? 'Plant Details' : 'Improve your garden now!'}</h1>
//       {alertMessage && <p className="alert">{alertMessage}</p>}
//       <div className="image-container">
//         {image ? (
//           <img src={URL.createObjectURL(image)} alt="Selected" className="image" />
//         ) : (
//           <p className="image-text">Drag and drop an image here or click to upload "JPEG" or "PNG"</p>
//         )}
//       </div>
//       <div className="button-container">
//         <button onClick={pickImage} className="button">Choose from Gallery</button>
//         <button onClick={identifyPlant} className="button" disabled={isIdentifying || !image}>
//           Identify Plant
//         </button>
//       </div>
//       {isIdentifying && <p className="loading">Identifying...</p>}
//       {isIdentified && (
//   <div className="result-container">
//     <div className="result-content">
//       <div className="result-image">
//         <img src={URL.createObjectURL(image)} alt="Identified Plant" className="result-image-display" />
//       </div>
//       <div className="result-info">
//         <input
//           type="text"
//           className="input"
//           onChange={(e) => setPlantName(e.target.value)}
//           value={plantName}
//           placeholder="Nom"
//         />
//         <input
//           type="text"
//           className="input"
//           value={plantScientificName}
//           placeholder="N_sciantifique"
//           readOnly
//         />
//         <input
//           type="text"
//           className="input"
//           value={plantFamily}
//           placeholder="Famille"
//           readOnly
//         />
//         <input
//           type="text"
//           className="input"
//           value={plantGenus}
//           placeholder="Genre"
//           readOnly
//         />
//         <input
//           type="text"
//           className="input"
//           onChange={(e) => setPlantState(e.target.value)}
//           value={plantState}
//           placeholder="État"
//         />
//         <button
//           onClick={savePlant}
//           className="button_save"
//           disabled={isSaving}
//         >
//         <img src="src/components/Plants/accept.png" />

//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default AddPlantsScreen;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import './AddPlantsScreen.css';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../../config/firebaseConfig';
import { getAuth } from "firebase/auth";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// const db = getDatabase(app);

const AddPlantsScreen = () => {
  const [image, setImage] = useState(null);
  const [plantName, setPlantName] = useState('');
  const [plantState, setPlantState] = useState('');
  const [plantFamily, setPlantFamily] = useState('');
  const [plantGenus, setPlantGenus] = useState('');
  const [plantScientificName, setPlantScientificName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const { plantId } = useParams();

  useEffect(() => {
    if (plantId) {
      loadPlantDetails();
    }
  }, [plantId]);

  const loadPlantDetails = async () => {
    try {
      const plantData = localStorage.getItem(plantId);
      if (plantData) {
        const { name, localUri, state } = JSON.parse(plantData);
        setPlantName(name);
        setImage(localUri);
        setPlantState(state || '');
      }
    } catch (error) {
      console.error('Error loading plant details:', error);
      alert('Error loading plant details.');
    }
  };

  const pickImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImage(file);
        setAlertMessage('');
      }
    };
    input.click();
  };

  const uploadToFirebase = async (file) => {
    const storageReference = storageRef(storage, `plants/${file.name}`);
    await uploadBytes(storageReference, file);
    return await getDownloadURL(storageReference);
  };

  const savePlant = async () => {
    if (!image || !plantName.trim()) {
      setAlertMessage('Please select an image, enter a plant name, and other details before saving.');
      return;
    }

    try {
      setIsSaving(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("User not authenticated.");
        navigate('/login');
        return;
      }
      const userId = user.uid;

      const firebaseUrl = await uploadToFirebase(image);

      const plantData = {
        id: uuidv4(),
        name: plantName.trim(),
        firebaseUrl: firebaseUrl,
        state: plantState,
        identification: {
          scientificName: plantScientificName || '',
          family: plantFamily || '',
          genus: plantGenus || ''
        },
      };

      await set(dbRef(database, `plants/${userId}/${plantData.id}`), plantData);

      setAlertMessage(`The plant "${plantName.trim()}" has been saved successfully!`);
      navigate('/home-screen-plants');
    } catch (error) {
      console.error('Error saving plant:', error);
      setAlertMessage('An error occurred while saving the plant: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-plant-container">
      <h1 className="title">{plantId ? 'Plant Details' : 'Add a New Plant'}</h1>
      {alertMessage && <p className="alert">{alertMessage}</p>}
      <div className="image-container">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Selected" className="image" />
        ) : (
          <p className="image-text">Drag and drop an image here or click to upload "JPEG" or "PNG"</p>
        )}
      </div>
      <div className="button-container">
        <button onClick={pickImage} className="button">Choose from Gallery</button>
      </div>
      <div className="result-container">
        <div className="result-content">
          <div className="result-image">
            {image && <img src={URL.createObjectURL(image)} alt="Plant" className="result-image-display" />}
          </div>
          <div className="result-info">
            <input
              type="text"
              className="input"
              onChange={(e) => setPlantName(e.target.value)}
              value={plantName}
              placeholder="Name"
            />
            <input
              type="text"
              className="input"
              onChange={(e) => setPlantScientificName(e.target.value)}
              value={plantScientificName}
              placeholder="Scientific Name"
            />
            <input
              type="text"
              className="input"
              onChange={(e) => setPlantFamily(e.target.value)}
              value={plantFamily}
              placeholder="Family"
            />
            <input
              type="text"
              className="input"
              onChange={(e) => setPlantGenus(e.target.value)}
              value={plantGenus}
              placeholder="Genus"
            />
            <input
              type="text"
              className="input"
              onChange={(e) => setPlantState(e.target.value)}
              value={plantState}
              placeholder="State"
            />
            <button
              onClick={savePlant}
              className="button_save"
              disabled={isSaving}
            >
              Save Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantsScreen;
