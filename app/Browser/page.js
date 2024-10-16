// app/browser/page.js
import React from 'react';
import BrowserCard from '../components/BrowserCard'; // Adjust the import path as necessary
import './Browser.css';

// Images
import friendsImage from '../../public/Images/Beige_Card.png'; 
import LoversImage from '../../public/Images/Lovers.png'; 
import MarriedImage from '../../public/Images/Married.png'; 
import GirlsImage from '../../public/Images/Girls.png'; 
import BoysImage from '../../public/Images/Boys.png'; 
import PurpleImage from '../../public/Images/Purple.png'; 
import ChristmasImage from '../../public/Images/Christmas.png';

const decks = [
  { to: '/friends', image: friendsImage, description: 'Questions for Friends' },
  { to: '/lovers', image: LoversImage, description: 'Questions for Lovers' },
  { to: '/married', image: MarriedImage, description: 'Questions for Married Couples' },
  { to: '/girls', image: GirlsImage, description: 'Questions for Girls' },
  { to: '/boys', image: BoysImage, description: 'Questions for Boys' },
  { to: '/purple', image: PurpleImage, description: 'Questions for Purple Lovers' },
];

const coming_soon = [
  { to: '', image: ChristmasImage, description: 'Questions for Christmas' },
  { to: '', image: LoversImage, description: 'Questions for Lovers' },
];

const Browser = () => {
  return (
    <div className="browser-page">
      <h2>Current Decks:</h2>
      <div className="deck-list">
        {decks.map((deck, index) => (
          <BrowserCard key={index} to={deck.to} image={deck.image} description={deck.description} />
        ))}
      </div>
      <h2>Coming soon:</h2>
      <div className="deck-list">
        {coming_soon.map((deck, index) => (
          <BrowserCard key={index} to={deck.to} image={deck.image} description={deck.description} />
        ))}
      </div>
    </div>
  );
};

export default Browser;