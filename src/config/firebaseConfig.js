// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyCBuCzn7y-wDu8ceLKWqNrsRV-ruHTQ1UI",
  authDomain: "smart-garden-dc0c4.firebaseapp.com",
  databaseURL: "https://smart-garden-dc0c4-default-rtdb.firebaseio.com",
  projectId: "smart-garden-dc0c4",
  storageBucket: "smart-garden-dc0c4.appspot.com",
  messagingSenderId: "646755395344",
  appId: "1:646755395344:web:ffba9f0af09fc7fc42e795",
  measurementId: "G-80HL368QXF"
};*/
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

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
