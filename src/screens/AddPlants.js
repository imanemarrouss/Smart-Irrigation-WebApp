import React, { useState } from 'react';
import CameraView from './CameraView'; // You can remove or replace this depending on how you handle camera

const AddPlants = () => {
  const [plantName, setPlantName] = useState('');
  const [plantSCName, setPlantSCName] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null); // To store selected image for the plant

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Use URL to display selected image
    }
  };

  const handleCameraPress = () => {
    setShowCamera(true);
  };

  const handleAlert = () => {
    window.alert('The plant has been created successfully!'); // Use window.alert for web
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Enter Plant Name"
        value={plantName}
        onChange={(e) => setPlantName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Add Scientific Name"
        value={plantSCName}
        onChange={(e) => setPlantSCName(e.target.value)}
      />

      <div style={styles.fileInputContainer}>
        <label style={styles.fileLabel} htmlFor="file-upload">Upload Plant Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
      </div>

      <button style={styles.button} onClick={handleCameraPress}>
        Open Camera
      </button>
      <button style={styles.button} onClick={handleAlert}>
        Create Plant
      </button>

      {showCamera && <CameraView style={styles.cam} imageName={plantName} />}

      {image && <img src={image} alt="Plant" style={styles.imagePreview} />}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    width: '100%',
  },
  input: {
    width: '90%',
    height: '40px',
    border: '1px solid green',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '10px',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '10px',
    border: 'none',
    cursor: 'pointer',
  },
  fileInputContainer: {
    marginBottom: '20px',
  },
  fileLabel: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  fileInput: {
    display: 'none',
  },
  cam: {
    paddingRight: '70px',
  },
  imagePreview: {
    width: '200px',
    height: 'auto',
    marginTop: '20px',
  },
};

export default AddPlants;
