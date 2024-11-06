'use client';
import React from 'react';
import Link from 'next/link';
import CardBox from '../components/Home/CardBox';
import LoginScroll from '../components/Login/loginscroll';
import DeckCard from '../components/Home/CollectionsCard'; // Import the DeckCard component

import friendsImage from '../../public/Images/Friends/Friends_Front.png';
import LoversImage from '../../public/Images/Couples/Couples_Front.png';
import familyImage from '../../public/Images/Family/Family_Front.png';
import newConnectionsImage from '../../public/Images/New_Connections/NewConnections_Front.png';

const HomePage = () => {
  // Hardcoded deck examples
  const exampleDecks = [
    { _id: '1', title: 'First Date', description: 'Questions for first dates', style: { imageUrl: { src: friendsImage } } },
    { _id: '2', title: 'Going Deeper', description: 'Deep questions for couples', style: { imageUrl: { src: LoversImage } } },
    { _id: '3', title: 'Family Bonding', description: 'Engaging questions for family', style: { imageUrl: { src: familyImage } } },
    { _id: '4', title: 'New Connections', description: 'Questions for new connections', style: { imageUrl: { src: newConnectionsImage } } },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-24 flex-grow">
        {/* New Landing Page Section */}
        <div className="bg-white py-16 relative">
          {/* Positioning LoginScroll behind the title */}
          <div className="absolute inset-0 z-0 opacity-20">
            <LoginScroll />
          </div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h1 className="text-5xl font-bold mb-6">Kizuna Cards</h1>
            <p className="text-xl mb-8">
              Join us to explore a world of creativity and connection. Start your journey by browsing our collections or creating your own custom decks.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/get-started" legacyBehavior>
                <a className="w-40 text-center bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded">
                  Get Started
                </a>
              </Link>
              <Link href="/learn-more" legacyBehavior>
                <a className="w-40 text-center bg-transparent hover:bg-purple-200 text-purple-700 font-semibold py-3 px-4 border border-purple-500 rounded">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Browse Our Decks Section */}
        <div className="p-8 flex flex-col lg:flex-row items-center justify-between mb-8 bg-purple-100">
          <div className="lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-left pr-20">
            <h2 className="text-3xl font-bold mb-4">Browse our decks</h2>
            <p className="text-lg mb-4">
              Discover a variety of questions designed to spark interesting conversations and deepen your connections with friends and loved ones. Browse our decks or subscribe for unlimited access to create your own decks with deeper questions and different themes.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <Link href="/browse" className="w-32 text-center bg-transparent hover:bg-purple-200 text-purple-700 font-semibold py-2 px-2 border border-purple-500 rounded">
                Browse
              </Link>
            </div>
          </div>
          <div className="flex lg:w-1/2 lg:justify-center lg:pl-8">
            <CardBox />
          </div>
        </div>

        {/* Collections Section with DeckCards in 2x2 Grid */}
        <div className="p-8 flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">
            {exampleDecks.map(deck => (
              <DeckCard key={deck._id} deck={deck} />
            ))}
          </div>
          <div className="lg:w-1/2 text-center lg:text-left lg:pl-20">
            <h2 className="text-3xl font-bold mb-4">Collections</h2>
            <p className="text-lg mb-4">
              Explore our curated collections of decks designed to enhance your experience. Dive into different themes and find the perfect set of questions for any occasion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
