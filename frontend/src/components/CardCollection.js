import './CardCollection.css';
import Card from './Card';
import AddCard from './AddCard';

const CardCollection = ({ allChars }) => {
  const allCards = allChars.map(char => <Card data={char} key={char.id} />);
  return (
    <div className="cardCollection">
      {allCards}
      <AddCard />
    </div>
  );
};

export default CardCollection;
