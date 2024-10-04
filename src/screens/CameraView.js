import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CameraView = ({ imageName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream);
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
        Alert.alert('Error', 'Could not access the camera.');
      }
    };

    if (isCameraOpen) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen, stream]);

  const takePicture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setSelectedImage(imageData);
    setIsCameraOpen(false);
  };

  const handleSave = () => {
    if (selectedImage) {
      // Handle image saving logic here
      console.log('Image saved:', selectedImage);
      setSelectedImage(null);
      Alert.alert('Success', 'The image has been saved successfully.');
    }
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isCameraOpen} animationType="slide">
        <View style={styles.cameraContainer}>
          <video ref={videoRef} autoPlay style={styles.video} />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onClick={takePicture}>
              <Icon name="camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onClick={() => setIsCameraOpen(false)}>
              <Icon name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <View style={styles.iconContainer}>
            <TouchableOpacity onClick={handleSave}>
              <Icon name="check" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onClick={handleDelete}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.openCameraButton} onClick={() => setIsCameraOpen(true)}>
          <Icon name="camera" size={30} color="#000" />
          <Text style={styles.iconText}>Take a Picture</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cameraButton: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 20,
    left: 20,
    right: 20,
  },
  openCameraButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default CameraView;
