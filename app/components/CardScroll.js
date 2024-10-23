import React from 'react';
import Image from 'next/image';
import '.CardScroll.css';

// Import images directly
import friendsImage from '../../public/Images/Friends/Friends_Front.png';
import LoversImage from '../../public/Images/Couples/Couples_Front.png';

const CardScroll = () => {
  // Define the card data directly within the component
  const cards = [
    { image: friendsImage, alt: 'Friends Card' },
    { image: LoversImage, alt: 'Lovers Card' },
  ];

  // Duplicate cards to create a seamless loop
  const duplicatedCards = [...cards, ...cards];

  return (
    <div className="card-scroll">
      <div className="card-scroll-track">
        {duplicatedCards.map((card, index) => (
          <div key={`${card.alt}-${index}`} className="card-scroll-item">
            <Image src={card.image} alt={card.alt} width={200} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardScroll;