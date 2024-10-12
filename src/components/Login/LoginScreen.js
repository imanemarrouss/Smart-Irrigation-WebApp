import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Animated, 
  Easing 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from '@firebase/app';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const emailInputAnim = useRef(new Animated.Value(1)).current;
  const passwordInputAnim = useRef(new Animated.Value(1)).current;
  const buttonColorAnim = useRef(new Animated.Value(0)).current;

  const firebaseConfig = {
    apiKey: "AIzaSyA4dj1AJToXNJRE7JBz4p5iEA-A-mUam08",
    authDomain: "smart-garden-v1-571d1.firebaseapp.com",
    projectId: "smart-garden-v1-571d1",
    storageBucket: "smart-garden-v1-571d1.appspot.com",
    messagingSenderId: "990416347868",
    appId: "1:990416347868:web:fe908db1d91c2c72a28a19",
    measurementId: "G-3LZ0PFYG77"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigation.navigate('UserProfile');
      }
    });

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();

    return () => unsubscribe();
  }, [auth, navigation, fadeAnim, translateYAnim]);

  const handleInputFocus = (inputType) => {
    Animated.spring(inputType, {
      toValue: 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = (inputType) => {
    Animated.spring(inputType, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleAuthentication = async () => {
    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(async () => {
      Animated.timing(buttonColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();

      try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          setNotification('Signed in successfully!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          setNotification('User created successfully!');
        }
      } catch (error) {
        setNotification('Authentication error: ' + error.message);
      }
    });
  };

  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2ecc71', '#27ae60'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('./Designer.webp')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Animated.View style={[styles.authContainer, { transform: [{ translateY: translateYAnim }] }]}>
          {!user && (
            <>
              <Text style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create an Account'}</Text>
              <Text style={styles.subHeader}>Enter your credentials to manage your garden</Text>
              <Animated.View style={{ transform: [{ scale: emailInputAnim }] }}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onFocus={() => handleInputFocus(emailInputAnim)}
                  onBlur={() => handleInputBlur(emailInputAnim)}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#bdc3c7"
                  autoCapitalize="none"
                />
              </Animated.View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onFocus={() => handleInputFocus(passwordInputAnim)}
                  onBlur={() => handleInputBlur(passwordInputAnim)}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  placeholder="Password"
                  placeholderTextColor="#bdc3c7"
                  secureTextEntry={!showPassword}
                />
                {password.length > 0 && (
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#bdc3c7" />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity style={styles.buttonContainer} onPress={handleAuthentication}>
                <Animated.View style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
                  <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleText}>
                  {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {notification && (
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationText}>{notification}</Text>
            </View>
          )}
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    imageRendering: 'high-quality',
  },
  authContainer: {
    width: '95%', // Increased width
    maxWidth: 450, // Increased max width
    padding: 50, // Increased padding
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#34495e',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  input: {
    height: 50,
    borderColor: '#2ecc71',
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    height: 50,
    borderColor: '#2ecc71',
    borderWidth: 1,
    padding: 15,
    paddingRight: 50, // Add padding to the right for the eye icon
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 14, // Center the icon vertically
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  notificationContainer: {
    marginTop: 15,
    backgroundColor: '#add8e6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400,
  },
  notificationText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
});
export default LoginScreen;