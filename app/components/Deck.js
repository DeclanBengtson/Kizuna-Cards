"use client";

import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import './Deck.css';

const initialState = (initialCards) => ({
  cards: initialCards,
  nextCardId: initialCards.length + 1,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.id ? { ...card, isFlipped: true, zIndex: state.cards.length + 1 } : card
        ),
      };
    case 'SLIDE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.id ? { ...card, isSlid: true, zIndex: state.cards.length + 1 } : card
        ),
      };
    case 'ADD_NEW_CARD':
      const newCard = {
        id: state.nextCardId,
        isFlipped: false,
        isSlid: false,
        frontContent: '',
        backContent: '',
        zIndex: 1
      };
      return {
        ...state,
        cards: [...state.cards, newCard].filter(card => !card.isSlid || card.id === action.id),
        nextCardId: state.nextCardId + 1,
      };
    default:
      return state;
  }
};

const Deck = ({ title, initialCards, customStyles, frontImage, backImage }) => {
  const [state, dispatch] = useReducer(reducer, initialCards, initialState);

  const handleCardClick = (id) => {
    const card = state.cards.find(card => card.id === id);
    if (!card) return;

    if (!card.isFlipped) {
      dispatch({ type: 'FLIP_CARD', id });
    } else {
      dispatch({ type: 'SLIDE_CARD', id });
      dispatch({ type: 'ADD_NEW_CARD', id });
    }
  };

  return (
    <div className="deck-container">
      <h1>{title}</h1>
      <div className="card-container">
        {state.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            customStyles={customStyles}
            onClick={() => handleCardClick(card.id)}
            frontImage={frontImage}
            backImage={backImage}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ card, customStyles, onClick, frontImage, backImage }) => (
  <motion.div
    className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isSlid ? 'slid' : ''} ${customStyles}`}
    style={{ zIndex: card.zIndex }}
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="front" style={{ backgroundImage: `url(${frontImage})` }}>
      <p>{card.frontContent}</p>
    </div>
    <div className="back" style={{ backgroundImage: `url(${backImage})` }}>
      <p>{card.backContent}</p>
    </div>
  </motion.div>
);

export default Deck;