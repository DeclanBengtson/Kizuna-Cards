import React from 'react';
import Link from 'next/link';
import Subscriptions from '../components/subscriptions/subscriptionsembed';
import CardBox from '../components/Home/CardBox';
import KizunaHighlight from '../components/Home/KizunaHighlight'; // Import the new component

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 pt-24 flex-grow">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-left pr-20">
            <h2 className="text-3xl font-bold mb-4">Play and Create</h2>
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
        <KizunaHighlight /> {/* Use the new component here */}
        <h2 className="text-3xl font-bold mb-4 text-center">Collections</h2>
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-center text-lg">
            Explore our curated collections of decks designed to enhance your experience. Dive into different themes and find the perfect set of questions for any occasion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;