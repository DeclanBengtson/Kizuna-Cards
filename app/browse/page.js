import React from 'react';
import BrowserCard from '../components/Browse/BrowserCard'; // Adjust the import path as necessary

// Images
import friendsImage from '../../public/Images/Friends/Friends_Front.png';
import LoversImage from '../../public/Images/Couples/Couples_Front.png';
import familyImage from '../../public/Images/Family/Family_Front.png';
import newConnectionsImage from '../../public/Images/New_Connections/NewConnections_Front.png';
import WorkColleaguesImage from '../../public/Images/WorkColleagues/WorkColleagues_Front.png';
import ChristmasImage from '../../public/Images/Christmas/Christmas_Front.png';

const Decks = [
  { to: '/couples', image: LoversImage, description: 'Questions for Couples' },
  { to: '/friends', image: friendsImage, description: 'Questions for Friends' },
  { to: '/family', image: familyImage, description: 'Questions for Family' },
  { to: '/newconnections', image: newConnectionsImage, description: 'Questions for New Connections' },
  { to: '/workcolleagues', image: WorkColleaguesImage, description: 'Questions for Work Colleagues' },
  { to: '/christmas', image: ChristmasImage, description: 'Questions for Christmas' },
];

const Browser = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Discover Meaningful Conversations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of conversation starters designed to deepen connections and create lasting memories.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="bg-purple-100 rounded-xl p-8 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">About Our Decks</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our decks are designed to spark interesting conversations and deepen connections with friends, family, and colleagues.
                </p>
                <p>
                  Whether you&apos;re looking to break the ice with new acquaintances or strengthen bonds with loved ones, we have a deck for every occasion.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {Decks.map((deck, index) => (
                <div key={index} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <BrowserCard
                    to={deck.to}
                    image={deck.image}
                    description={deck.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browser;