import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';


const LoginScreen = ({ navigation }) => { // Pass navigation as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyCBuCzn7y-wDu8ceLKWqNrsRV-ruHTQ1UI",
    authDomain: "smart-garden-dc0c4.firebaseapp.com",
    databaseURL: "https://smart-garden-dc0c4-default-rtdb.firebaseio.com",
    projectId: "smart-garden-dc0c4",
    storageBucket: "smart-garden-dc0c4.appspot.com",
    messagingSenderId: "646755395344",
    appId: "1:646755395344:web:ffba9f0af09fc7fc42e795",
    measurementId: "G-80HL368QXF"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      // If user is logged in, navigate to HomeScreen
      navigation.navigate('Home');
    }
  });

  return () => unsubscribe();
}, [auth, navigation]);

const handleAuthentication = async () => {
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
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!user && (
        // Show sign-in or sign-up form if user is not authenticated
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
          </View>
        </View>
      )}
      {notification && <Text style={styles.notificationText}>{notification}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 14, // Adjust the font size
    color: '#fff', // Set text color to white
    backgroundColor: '#ff0000', // Set background color to red
    paddingVertical: 8, // Add vertical padding
    paddingHorizontal: 16, // Add horizontal padding
    borderRadius: 4, // Add border radius for rounded corners
    alignSelf: 'stretch', // Make text stretch to fit container width
    textAlign: 'center', // Center-align text
    marginTop: 10, // Add top margin
  }
});

export default LoginScreen;
