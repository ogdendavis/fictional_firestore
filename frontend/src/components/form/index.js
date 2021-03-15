import React, { useState, useEffect } from 'react';

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

const AddForm = ({ visible, toggleForm, handleForm, initialVals }) => {
  // State to handle form changes and submission
  const [vals, setVals] = useState({});

  useEffect(() => {
    // If we have data in initial vals, use them to set vals
    if (initialVals.hasOwnProperty('id')) {
      // Reshape object, as DB format is different
      setVals({
        id: initialVals.id,
        name: initialVals.name,
        description: initialVals.description,
        image: initialVals.image,
        genre: initialVals.source.genre,
        title: initialVals.source.first_appearance.title,
        author: initialVals.source.first_appearance.author,
        date: initialVals.source.first_appearance.date,
        series: initialVals.source.series_world,
      });
    } else {
      // Set default (empty) vals
      setVals(defaultVals);
    }
  }, [visible, initialVals]);

  // Handler for individual field values
  const handleInput = prop => event => {
    // Copy current state for modification
    const newVals = { ...vals };
    // Update edited field
    newVals[prop] = event.target.value;
    // Set new state
    setVals(newVals);
  };

  // Set title and button to reflect whether editing or adding
  const [titleText, buttonText] = initialVals.hasOwnProperty('id')
    ? [`Edit ${initialVals.name}`, `Submit edits`]
    : ['Add a Character', 'Submit new character'];

  return (
    <div
      className={`addForm ${visible && 'addForm--visible'}`}
      onClick={toggleForm({})}
    >
      <div
        className="addForm__inner"
        onClick={event => {
          // Stop event propagation to avoid toggleForm firing on parent div
          event.stopPropagation();
        }}
      >
        <h2>{titleText}</h2>
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
          <button onClick={handleForm(vals)}>{buttonText}</button>
          {initialVals.hasOwnProperty('id') && (
            <button
              className="button--delete"
              onClick={handleForm({
                delete: true,
                id: vals.id,
                name: vals.name,
              })}
            >
              DELETE this character
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddForm;
