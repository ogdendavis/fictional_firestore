import './CardCollection.css';
import Card from './Card';
import AddCard from './AddCard';

const CardCollection = ({ allChars, toggleForm }) => {
  const allCards = allChars.map(char => (
    <Card data={char} key={char.id} toggleForm={toggleForm} />
  ));
  return (
    <div className="cardCollection">
      {allCards}
      <AddCard toggleForm={toggleForm} />
    </div>
  );
};

export default CardCollection;
