import './Input.css';

const Input = ({ label, fieldVal, updateVal }) => {
  // Create unique id
  const id = `${label.toLowerCase().replace(' ', '-')}-input`;
  // To stop React complaining about uncontrolled fields for new char
  const val = fieldVal ? fieldVal : '';
  return (
    <div className="input">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        type="text"
        placeholder={label}
        value={val}
        onChange={updateVal}
      />
    </div>
  );
};

export default Input;
