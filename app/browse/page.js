import React from 'react';
import BrowserCard from '../components/BrowserCard'; // Adjust the import path as necessary


// Images
import friendsImage from '../../public/Images/Friends/Friends_Front.png'; 
import LoversImage from '../../public/Images/Couples/Couples_Front.png'; 
import familyImage from '../../public/Images/Family/Family_Front.png'; 
import newConnectionsImage from '../../public/Images/New_Connections/NewConnections_Front.png'; 
import WorkColleaguesImage from '../../public/Images/WorkColleagues/WorkColleagues_Front.png'; 
import ChristmasImage from '../../public/Images/Christmas/Christmas_Front.png'

const decks = [
  { to: '/friends', image: friendsImage, description: 'Questions for Friends' },
  { to: '/lovers', image: LoversImage, description: 'Questions for Lovers' },
  { to: '/family', image: familyImage, description: 'Questions for Family' },
  { to: '/newconnections', image: newConnectionsImage, description: 'Questions for New Connections' },
  { to: '/workcolleagues', image: WorkColleaguesImage, description: 'Questions for Work Colleagues' },
  { to: '/christmas', image: ChristmasImage, description: 'Questions for Christmas' },
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