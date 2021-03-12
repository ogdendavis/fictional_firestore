import './Card.css';

const Card = ({ data }) => {
  console.log(data);
  return (
    <div class="card">
      <div
        class="card__background"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default Card;
