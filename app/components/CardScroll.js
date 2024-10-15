// app/components/CardScroll.js
import React from 'react';

const CardScroll = ({ cards }) => {
  return (
    <div className="card-scroll">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <img src={card.image.src} alt={card.alt} />
        </div>
      ))}
    </div>
  );
};

export default CardScroll;