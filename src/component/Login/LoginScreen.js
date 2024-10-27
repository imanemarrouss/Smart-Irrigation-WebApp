import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import './LoginScreen.css'; // Use this for styles

const firebaseConfig = {
  apiKey: "AIzaSyA4dj1AJToXNJRE7JBz4p5iEA-A-mUam08",
  authDomain: "smart-garden-v1-571d1.firebaseapp.com",
  projectId: "smart-garden-v1-571d1",
  storageBucket: "smart-garden-v1-571d1.appspot.com",
  messagingSenderId: "990416347868",
  appId: "1:990416347868:web:fe908db1d91c2c72a28a19",
  measurementId: "G-3LZ0PFYG77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigation.navigate('UserProfile');
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
      <div className="Login-container">
        <div className="auth-container">
          {!user && (
            <>
              <h1 className="title_login">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
              <p className="sub-header_login">Enter your credentials to manage your garden</p>
              <input
  className="input_login email_input"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  type="email"
/>
<input
  className="input_login password_input"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  type={showPassword ? 'text' : 'password'}
/>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="showPasswordCheckbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPasswordCheckbox">Show Password</label>
              </div>
              <button className="button_login" onClick={handleAuthentication}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
              <button className="toggle-text_login" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
              </button>
            </>
          )}
          {notification && <div className="notification_login">{notification}</div>}
        </div>
      </div>
    );
  };
  
  export default LoginScreen;