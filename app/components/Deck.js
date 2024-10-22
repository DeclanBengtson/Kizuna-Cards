'use client';

import React, { useReducer, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Deck.css';

const initialState = (initialCards, questions) => ({
  cards: initialCards,
  nextCardId: initialCards.length + 1,
  questions: questions.slice(initialCards.length),
  isAnimating: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.id ? { ...card, isFlipped: !card.isFlipped, zIndex: state.cards.length + 1 } : card
        ),
        isAnimating: true,
      };
    case 'SLIDE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.id ? { ...card, isSlid: true, zIndex: state.cards.length + 1 } : card
        ),
        isAnimating: true,
      };
    case 'ADD_NEW_CARD':
      if (state.questions.length === 0) return { ...state, isAnimating: false };

      const newQuestion = state.questions[0];
      const newCard = {
        id: state.nextCardId,
        isFlipped: false,
        isSlid: false,
        frontContent: '',
        backContent: newQuestion.backContent,
        zIndex: 1
      };

      return {
        ...state,
        cards: [...state.cards.filter(card => !card.isSlid), newCard],
        nextCardId: state.nextCardId + 1,
        questions: state.questions.slice(1),
        isAnimating: false,
      };
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.value };
    default:
      return state;
  }
};

const Deck = ({ title, initialCards, questions, customStyles, frontImage, backImage, fontStyle }) => {
  const [state, dispatch] = useReducer(reducer, { initialCards, questions }, ({ initialCards, questions }) => initialState(initialCards, questions));
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = (id) => {
    if (state.isAnimating) return;

    const card = state.cards.find(card => card.id === id);
    if (!card) return;

    if (!card.isFlipped) {
      dispatch({ type: 'FLIP_CARD', id });
      animationTimeoutRef.current = setTimeout(() => dispatch({ type: 'SET_ANIMATING', value: false }), 600);
    } else {
      dispatch({ type: 'SLIDE_CARD', id });
      animationTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'ADD_NEW_CARD', id });
      }, 600);
    }
  };

  return (
    <div className="deck-container">
      <h1>{title}</h1>
      <div className="card-container">
        <AnimatePresence>
          {state.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              customStyles={customStyles}
              fontStyle={fontStyle}
              onClick={() => handleCardClick(card.id)}
              frontImage={frontImage}
              backImage={backImage}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Card = ({ card, customStyles, fontStyle, onClick, frontImage, backImage }) => (
  <motion.div
    className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isSlid ? 'slid' : ''} ${customStyles}`}
    style={{ zIndex: card.zIndex }}
    onClick={onClick}
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: 50 }}
    transition={{ duration: 0.4 }}
  >
    <div className="card-inner">
      <div className="front" style={{ backgroundImage: frontImage ? `url(${frontImage})` : 'none' }}>
        <div className="content" style={fontStyle}>{card.frontContent}</div>
      </div>
      <div className="back" style={{ backgroundImage: backImage ? `url(${backImage})` : 'none' }}>
        <div className="content" style={fontStyle}>{card.backContent}</div>
      </div>
    </div>
  </motion.div>
);

export default Deck;