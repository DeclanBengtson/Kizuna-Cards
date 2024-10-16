import Image from 'next/image';
import './CardScroll.css';

const CardScroll = ({ cards }) => {
  return (
    <div className="card-scroll">
      <div className="card-scroll-track">
        {cards.map((card, index) => (
          <div key={index} className="card-scroll-item">
            <Image src={card.image} alt={card.alt} width={200} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardScroll;