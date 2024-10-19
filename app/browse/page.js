import React from 'react';
import BrowserCard from '../components/BrowserCard'; // Adjust the import path as necessary


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

const Browser = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-6 current-decks">Current Decks</h2>
        <p className="text-lg text-gray-600">Explore our collection of question decks to spark interesting conversations.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck, index) => (
          <BrowserCard key={index} to={deck.to} image={deck.image} description={deck.description} />
        ))}
      </div>
    </div>
  );
};

export default Browser;