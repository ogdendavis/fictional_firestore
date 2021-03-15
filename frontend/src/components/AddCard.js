import './Card.css';

const AddCard = ({ toggleForm }) => {
  return (
    <div className="card card--addCard" onClick={toggleForm}>
      <h2>Add a Character</h2>
      <span>&#43;</span>
    </div>
  );
};

export default AddCard;
