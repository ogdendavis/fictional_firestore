import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';

import CardCollection from './components/CardCollection';
import AddForm from './components/AddForm';

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

  return (
    <div className="app">
      {chars && <CardCollection allChars={chars} toggleForm={toggleForm} />}
      <AddForm visible={formVisible} toggleForm={toggleForm} />
    </div>
  );
};

export default App;
