import Image from 'next/image';
import './CardScroll.css';

const CardScroll = ({ cards }) => {
  // Duplicate cards to create a seamless loop
  const duplicatedCards = [...cards, ...cards];

  return (
    <div className="card-scroll">
      <div className="card-scroll-track">
        {duplicatedCards.map((card, index) => (
          <div key={index} className="card-scroll-item">
            <Image src={card.image} alt={card.alt} width={200} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardScroll;