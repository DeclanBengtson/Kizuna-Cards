import React from 'react';
import Deck from '../components/Deck';
import './friends.css';

// Example initial cards
const initialCards = [
  {
    id: 1,
    isFlipped: false,
    isSlid: false,
    frontContent: '',
    backContent: 'Answer 1',
    zIndex: 1
  },
  {
    id: 2,
    isFlipped: false,
    isSlid: false,
    frontContent: '',
    backContent: 'Answer 2',
    zIndex: 1
  }
  // Add more cards as needed
];

const Friends = () => {
  return (
    <div className="friends-page">
      <Deck initialCards={initialCards} customStyles="friends-card" />
    </div>
  );
};

export default Friends;