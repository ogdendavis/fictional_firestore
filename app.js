// Enable .env
require('dotenv').config();
// Too lazy to  type
const env = process.env;

// Express setup
const express = require('express');
const app = express();
const port = 3000;

// Load Firebase & Firestore
const firebase = require('firebase/app');
require('firebase/firestore');

// Firebase Config
const fbConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

// Initialize Firebase and Firestore
firebase.initializeApp(fbConfig);
const store = firebase.firestore();

// Get reference to characters collection
const chars = store.collection('characters');

app.get('/', (req, res) => {
  // Get method returns promise
  // data in snapshot.docs
  chars.get().then(snapshot => {
    // Array of objects
    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
    res.send(data);
  });
});

app.listen(port, () => {
  console.log('Away we go!');
});
