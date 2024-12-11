import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera/legacy';
import { storage } from '../../config/firebaseConfig'; 
import { ref, uploadBytes } from 'firebase/storage'; 

const AddPlants = () => {
  const [plantTitle, setPlantTitle] = useState('');
  // const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [ setUploading] = useState(false);
  const [showPlantContainer, setShowPlantContainer] = useState(false);
  const [focus, setFocus] = useState({ x: 0, y: 0 });
  const [width ] = useState(0);
  const [height] = useState(0);
  // const [zoom, setZoom] = useState(0);
  const [ setShowNotification] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        setFocus({
          x: Math.max(0, Math.min(1, (dx / width) + focus.x)),
          y: Math.max(0, Math.min(1, (dy / height) + focus.y)),
        });
      },
      onPanResponderGrant: (_, gestureState) => {
        setFocus({
          x: Math.max(0, Math.min(1, (gestureState.x0 / width))),
          y: Math.max(0, Math.min(1, (gestureState.y0 / height))),
        });
      },
    })
  ).current;

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setShowNotification(true);
      }
    };
    requestPermissions();
  }, []);

  const toggleCameraVisibility = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 3) {
      setClickCount(0);
      setIsCameraVisible(false);
      setCapturedImage(null);
    } else {
      setIsCameraVisible(true);
    }
  };

  const takePicture = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    setCapturedImage(photo);
    setClickCount(clickCount + 1);
    setShowPlantContainer(true);
    saveImageToFirebase(photo);
  };

  const saveImageToFirebase = async (image) => {
    if (!image) return;

    setUploading(true);
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `plantImages/${Date.now()}`);
      await uploadBytes(storageRef, blob);

      Alert.alert('Success', 'Image saved to Firebase Storage.');
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error', 'Failed to save image to Firebase Storage.');
    }
    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Plant</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Plant Title"
        value={plantTitle}
        onChangeText={setPlantTitle}
      />
      {capturedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.image} />
        </View>
      )}
      {isCameraVisible && (
        <View style={styles.cameraContainer} {...panResponder.panHandlers}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
          />
        </View>
      )}
      <TouchableOpacity style={styles.cameraToggle} onPress={toggleCameraVisibility}>
        <FontAwesome name={isCameraVisible ? 'camera' : 'camera-off'} size={30} color="black" />
      </TouchableOpacity>
      {!isCameraVisible && !capturedImage && (
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Save Image</Text>
        </TouchableOpacity>
      )}
      {showPlantContainer && (
        <View style={styles.plantContainer}>
          <Text>Plante détectée : {plantTitle}</Text>
          <TouchableOpacity style={styles.saveButton} onPress={saveImageToFirebase}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: 400, // Ajustez selon vos besoins
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  plantContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  cameraToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default AddPlants;
