import React, { useState } from 'react';

import './AddForm.css';
import Input from './Input';

// Default values for form
const defaultVals = {
  name: '',
  description: '',
  image: '',
  // Fields below go in source map in db
  genre: '',
  title: '',
  author: '',
  date: '', // Update to actual datetime?
  series: '',
};

const AddForm = ({ visible, toggleForm, handleSubmit }) => {
  const handleClick = e => {
    // Close form if click is on background (not form itself)
    if (e.target.classList.contains('addForm--visible')) {
      toggleForm();
    }
  };

  // State to handle form changes and submission
  // TODO: update this to handle updating existing character
  const [vals, setVals] = useState(defaultVals);

  // Handler for individual field values
  const handleInput = prop => event => {
    // Copy current state for modification
    const newVals = { ...vals };
    // Update edited field
    newVals[prop] = event.target.value;
    // Set new state
    setVals(newVals);
  };

  return (
    <div
      className={`addForm ${visible && 'addForm--visible'}`}
      onClick={handleClick}
    >
      <div className="addForm__inner">
        <h2>Add a Character</h2>
        <form className="addForm__form">
          <h3>Character Information</h3>
          <Input
            label="Name"
            fieldVal={vals.name}
            updateVal={handleInput('name')}
          />
          <Input
            label="Description"
            fieldVal={vals.description}
            updateVal={handleInput('description')}
          />
          <Input
            label="Image (url)"
            fieldVal={vals.image}
            updateVal={handleInput('image')}
          />
          <h3>First Appearance</h3>
          <Input
            label="Genre"
            fieldVal={vals.genre}
            updateVal={handleInput('genre')}
          />
          <Input
            label="Title"
            fieldVal={vals.title}
            updateVal={handleInput('title')}
          />
          <Input
            label="Author"
            fieldVal={vals.author}
            updateVal={handleInput('author')}
          />
          <Input
            label="Published date"
            fieldVal={vals.date}
            updateVal={handleInput('date')}
          />
          <Input
            label="Series (if applicable)"
            fieldVal={vals.series}
            updateVal={handleInput('series')}
          />
          <button onClick={handleSubmit(vals)}>Add Character</button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
