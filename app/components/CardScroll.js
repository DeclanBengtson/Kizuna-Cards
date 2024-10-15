// app/components/CardScroll.js
import React from 'react';
import './CardScroll.css';

const CardScroll = ({ cards }) => {
  return (
    <div className="card-scroll">
      <div className="card-scroll-track">
        {cards.map((card, index) => (
          <div key={index} className="card-scroll-item">
            <img src={card.image.src} alt={card.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardScroll;