import React from 'react';
import BrowserCard from '../components/BrowserCard'; // Adjust the import path as necessary

// Images
import friendsImage from '../../public/Images/Friends/Friends_Front.png';
import LoversImage from '../../public/Images/Couples/Couples_Front.png';
import familyImage from '../../public/Images/Family/Family_Front.png';
import newConnectionsImage from '../../public/Images/New_Connections/NewConnections_Front.png';
import WorkColleaguesImage from '../../public/Images/WorkColleagues/WorkColleagues_Front.png';
import ChristmasImage from '../../public/Images/Christmas/Christmas_Front.png';

const Decks = [
  { to: '/lovers', image: LoversImage, description: 'Questions for Lovers' },
  { to: '/friends', image: friendsImage, description: 'Questions for Friends' },
  { to: '/family', image: familyImage, description: 'Questions for Family' },
  { to: '/newconnections', image: newConnectionsImage, description: 'Questions for New Connections' },
  { to: '/workcolleagues', image: WorkColleaguesImage, description: 'Questions for Work Colleagues' },
  { to: '/christmas', image: ChristmasImage, description: 'Questions for Christmas' },
];

const Browser = () => {
  return (
    <div className="flex h-screen pt-24">
      {/* Static Content on the Left */}
      <div className="w-1/3 bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">About Our Decks</h2>
        <p className="text-gray-700 mb-4">
          Our decks are designed to spark interesting conversations and deepen connections with friends, family, and colleagues.
        </p>
        <p className="text-gray-700">
          Whether you&apos;re looking to break the ice with new acquaintances or strengthen bonds with loved ones, we have a deck for every occasion.
        </p>
      </div>

      {/* Browser Cards on the Right */}
      <div className="w-2/3 overflow-y-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Our Decks</h2>
          <p className="text-lg text-gray-600">Explore our collection of free question decks to spark interesting conversations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Decks.map((deck, index) => (
            <BrowserCard key={index} to={deck.to} image={deck.image} description={deck.description} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Browser;