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

  // Character info for edit form
  const [charToEdit, setCharToEdit] = useState({});

  // Helper function to toggle form visibility
  const toggleForm = selectedChar => event => {
    // If sending a character to edit, set it!
    setCharToEdit(selectedChar);
    // Toggle visibility
    setFormVisible(!formVisible);
  };

  // Populate characters on load
  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(j => setChars(j));
  }, []);

  // Helper function to create new character
  const createNewChar = data => {
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
      });
  };

  // Helper function to update existing character
  const updateChar = data => {
    // Send put request with data
    // TODO: sanitization/checking
    fetch(API_BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => {
      // If good status gode, update state
      if (res.status === 200) {
        // Data is flat object sent with request
        // Reshape for state
        const reshaped = {
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          source: {
            genre: data.genre,
            series_world: data.series,
            first_appearance: {
              author: data.author,
              date: data.date,
              title: data.title,
            },
          },
        };

        // Get a copy of state array, with old vals for updated char removed and replaced
        const newCharsArr = chars.map(char =>
          char.id === reshaped.id ? reshaped : char
        );
        setChars(newCharsArr);
      }
    });
  };

  const handleForm = data => event => {
    // Prevent page reload on form submission
    event.preventDefault();

    // If provided data has an id, we should be updating an existing character
    if (data.hasOwnProperty('id')) {
      updateChar(data);
    }
    // Otherwise, create new character
    else {
      createNewChar(data);
    }
    // And close the form
    setFormVisible(false);
  };

  return (
    <div className="app">
      <h1>Fictional Characters</h1>
      {chars && <CardCollection allChars={chars} toggleForm={toggleForm} />}
      <AddForm
        visible={formVisible}
        toggleForm={toggleForm}
        handleForm={handleForm}
        initialVals={charToEdit}
      />
    </div>
  );
};

export default App;
