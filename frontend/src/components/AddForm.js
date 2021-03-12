import React from 'react';

import './AddForm.css';

const AddForm = ({ visible, toggleForm }) => {
  const handleClick = e => {
    // Close form if click is on background (not form itself)
    if (e.target.classList.contains('addForm--visible')) {
      toggleForm();
    }
  };

  return (
    <div
      className={`addForm ${visible && 'addForm--visible'}`}
      onClick={handleClick}
    >
      <div className="addForm__inner">
        <h2>Add a Character</h2>
        <form className="addForm__form">I am now a form!</form>
      </div>
    </div>
  );
};

export default AddForm;
