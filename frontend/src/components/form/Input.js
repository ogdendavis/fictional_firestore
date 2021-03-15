import './Input.css';

const Input = ({ label, fieldVal, updateVal }) => {
  // Create unique id
  const id = `${label.toLowerCase().replace(' ', '-')}-input`;

  return (
    <div className="input">
      <input
        id={id}
        type="text"
        placeholder={label}
        value={fieldVal}
        onChange={updateVal}
      />
    </div>
  );
};

export default Input;
