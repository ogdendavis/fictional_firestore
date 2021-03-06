import './Card.css';

const Card = ({ data, toggleForm }) => {
  return (
    <div className="card" onClick={toggleForm(data)}>
      <div
        className="card__background"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default Card;
