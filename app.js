// Enable .env
require('dotenv').config();
// Too lazy to  type
const env = process.env;

// Express modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

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

// Helper function to convert timestamp object to date string
const makeDateString = stamp => {
  const dateObj = new Date(stamp.seconds * 1000);
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
};

// Get all chars for display
app.get('/', (req, res) => {
  // Get method returns promise
  // data in snapshot.docs
  chars.get().then(snapshot => {
    // Array of objects
    const data = snapshot.docs.map(d => {
      // Grab data
      const unpacked = d.data();

      // We have a mix of strings and objects for date - stringify the objects!
      const date =
        typeof unpacked.source.first_appearance.date === 'string'
          ? unpacked.source.first_appearance.date
          : makeDateString(unpacked.source.first_appearance.date);
      unpacked.source.first_appearance.date = date;

      return {
        id: d.id,
        ...unpacked,
      };
    });
    res.send(data);
  });
});

// Create a new character in database
app.post('/', (req, res) => {
  // TODO: check/sanitize data

  // Convert flat req.body into correct shape for DB
  const charObj = convertBody(req.body);

  // Use add method on collection reference
  chars.add(charObj).then(ref => {
    // add returns document reference - use it to get & return saved data
    ref.get().then(snap =>
      res.send({
        // Remember to get the id!
        id: snap.id,
        ...snap.data(),
      })
    );
  });
});

// Update an existing character
app.put('/', (req, res) => {
  // TODO: check/sanitize data

  // Convert flat req.body into shape for DB
  const charObj = convertBody(req.body);

  // Use doc method on collection reference to get single document
  chars
    .doc(req.body.id)
    .update(charObj)
    .then(ret => {
      // Just send default return for now - only status used on front end
      res.send(ret);
    });
});

app.listen(env.PORT, () => {
  console.log(`Express server running on localhost:${env.PORT}`);
});

// Delete an existing character
app.delete('/', (req, res) => {
  // TODO - again, checks

  // Grab the document with .doc, and delete it!
  chars
    .doc(req.body.id)
    .delete()
    .then(ret => res.send(ret));
});

// Helper to convert flat req.body into proper shape for DB
const convertBody = body => {
  return {
    name: body.name,
    description: body.description,
    image: body.image,
    source: {
      genre: body.genre,
      series_world: body.series,
      first_appearance: {
        author: body.author,
        date: body.date,
        title: body.title,
      },
    },
  };
};
