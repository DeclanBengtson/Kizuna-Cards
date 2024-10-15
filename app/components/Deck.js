"use client";

import React, { useState } from 'react';
import './Deck.css';

const Deck = ({ title, initialCards, customStyles }) => {
  const [cards, setCards] = useState(initialCards);

  const handleCardClick = (id) => {
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex === -1) return;

    const cardToFlip = cards[cardIndex];

    if (!cardToFlip.isFlipped) {
      flipCard(cardIndex);
    } else {
      slideCard(cardIndex);
      addNewCard();
    }
  };

  const flipCard = (index) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map((card, idx) => 
        idx === index ? { ...card, backContent: 'response', isFlipped: true, zIndex: prevCards.length + 1 } : card
      );
      return updatedCards;
    });
  };

  const slideCard = (index) => {
    setCards(prevCards => 
      prevCards.map((card, idx) => 
        idx === index ? { ...card, isSlid: true, zIndex: prevCards.length + 1 } : { ...card, zIndex: 1 }
      )
    );
  };

  const addNewCard = () => {
    setCards(prevCards => {
      const newCard = {
        id: prevCards.length + 1,
        isFlipped: false,
        isSlid: false,
        frontContent: '',
        backContent: '',
        zIndex: 1
      };

      const updatedCards = [...prevCards, newCard];
      const slidCards = updatedCards.filter(card => card.isSlid);

      // If there are more than 2 slid cards, remove the oldest one
      if (slidCards.length > 2) {
        const firstSlidIndex = updatedCards.findIndex(card => card.isSlid);
        updatedCards.splice(firstSlidIndex, 1);
      }

      return updatedCards;
    });
  };

  return (
    <div className="deck-container">
      <h1>{title}</h1>
      <div className="card-container">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isSlid ? 'slid' : ''} ${customStyles}`}
            style={{ zIndex: card.zIndex }}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="front">
              <p>{card.frontContent}</p>
            </div>
            <div className="back">
              <p>{card.backContent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;