// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
