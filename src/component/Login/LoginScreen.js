import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../config/firebaseConfig';



// Initialize Firebase
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/home-screen-plants'); // Redirect to user profile
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

  // Inline styles
  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: 'url(./Designer.webp) no-repeat center center',
      backgroundSize: 'cover',
      backgroundColor: '#e8f5e9',
      margin: 0,
      padding: 0,
    },
    authContainer: {
      width: '90%',
      maxWidth: '400px',
      padding: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      border: '2px solid #4CAF50',
      margin: 'auto',
    },
    title: {
      fontSize: '26px',
      marginBottom: '10px',
      color: '#2E7D32',
    },
    subHeader: {
      fontSize: '16px',
      marginBottom: '20px',
      color: '#7f8c8d',
    },
    input: {
      width: 'calc(100% - 24px)',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '5px',
      border: '1px solid #4CAF50',
      backgroundColor: '#f9fbe7',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#388E3C',
    },
    toggleText: {
      color: '#3498db',
      marginTop: '10px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    notification: {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: '#dcedc8',
      borderRadius: '5px',
      border: '1px solid #4CAF50',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.authContainer}>
        {!user && (
          <>
            <h1 style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
            <p style={styles.subHeader}>Enter your credentials to manage your garden</p>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <input
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
            />
            <div>
              <input
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPasswordCheckbox">Show Password</label>
            </div>
            <button style={styles.button} onClick={handleAuthentication}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
            <button style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </>
        )}
        {notification && <div style={styles.notification}>{notification}</div>}
      </div>
    </div>
  );
};


export default LoginScreen;
