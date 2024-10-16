// app/lovers/page.js
import React from 'react';
import Deck from '../components/Deck';
import './Lovers.css'; 

const cards = [
  { id: 1, frontContent: '', backContent: '', isFlipped: false, isSlid: false },
  { id: 2, frontContent: '', backContent: '', isFlipped: false, isSlid: false },
];

const Lovers = () => {
  return (
    <div className="lovers-page">
      <h2 className="lovers-title">Lovers</h2>
      <Deck initialCards={cards} customStyles="lovers-card" />
    </div>
  );
};

export default Lovers;