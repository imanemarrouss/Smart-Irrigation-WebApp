import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // Initial opacity is 0

  // Fade in animation for the title
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/image1.png')} // A background image with green leaves
        style={styles.background}
      >
       <Animated.View 
  style={[
    styles.content, 
    { 
      opacity: fadeAnim,
      transform: [
        {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0] // Start 50 pixels down and animate to original position
          })
        },
        {
          rotate: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'] // Rotate from 0 to 360 degrees
          })
        }
      ]
    }
  ]}
>
  <Text style={styles.title}>Bienvenue dans votre jardin intelligent  !</Text>
</Animated.View>

        <View style={styles.footer}>
          {/* Icons can be wrapped in Animated components for subtle effects */}
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('SensorDataHistory')}>
            <Image source={require('../../assets/icone1.jpg')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Dashboard')}>
            <Image source={require('../../assets/icone2.jpg')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AddPlants')}>
            <Image source={require('../../assets/icone3.jpg')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AllPlants')}>
            <Image source={require('../../assets/icone4.jpg')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // A soft background color reminiscent of sunlight
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover', // Ensure the background image covers the whole screen
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white', // A dark color for contrast against the light background
    textShadowRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // A translucent footer to blend with the background
  },
  icon: {
    // Add animations or other styling as needed
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

export default Home;