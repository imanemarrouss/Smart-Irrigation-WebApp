import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCBuCzn7y-wDu8ceLKWqNrsRV-ruHTQ1UI",
  authDomain: "smart-garden-dc0c4.firebaseapp.com",
  databaseURL: "https://smart-garden-dc0c4-default-rtdb.firebaseio.com",
  projectId: "smart-garden-dc0c4",
  storageBucket: "smart-garden-dc0c4.appspot.com",
  messagingSenderId: "646755395344",
  appId: "1:646755395344:web:ffba9f0af09fc7fc42e795",
  measurementId: "G-80HL368QXF",
};

// Initialize Firebase only if no app is initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(app);
const database = getDatabase(app);

export { app, storage, database };
