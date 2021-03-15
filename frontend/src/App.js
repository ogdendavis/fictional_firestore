import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';

import CardCollection from './components/CardCollection';
import AddForm from './components/form';

const App = () => {
  // Make sure Express app is runnin on port 3003 before starting
  const API_BASE = 'http://localhost:3003';

  // State to hold all characters
  const [chars, setChars] = useState([]);

  // State for form visibility
  const [formVisible, setFormVisible] = useState(false);

  // Helper function to toggle form visibility
  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  // Populate characters on load
  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(j => setChars(j));
  }, []);

  // Helper function to create new character
  const createNewChar = data => event => {
    // Prevent page reload on form submission
    event.preventDefault();
    // Send post request with data
    // TODO: sanitization/checking
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(charInDB => {
        // Returns object as saved in DB -- add it to state!
        setChars([...chars, charInDB]);
        // And close the form
        toggleForm();
      });
  };

  return (
    <div className="app">
      {chars && <CardCollection allChars={chars} toggleForm={toggleForm} />}
      <AddForm
        visible={formVisible}
        toggleForm={toggleForm}
        handleSubmit={createNewChar}
      />
    </div>
  );
};

export default App;
