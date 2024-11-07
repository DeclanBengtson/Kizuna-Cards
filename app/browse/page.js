import React from 'react';
import BrowserCard from '../components/Browse/BrowserCard';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-pink-200 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-pink-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 leading-tight">
            Discover Meaningful Conversations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of conversation starters designed to deepen connections and create lasting memories.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-3 gap-6">
              {Decks.map((deck, index) => (
                <div 
                  key={index} 
                  className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100/50"
                >
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