"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardLink from '../components/CardLink';
import CardScroll from '../components/CardScroll';

// Images
import friendsImage from '../../public/Images/Friends/Friends_Front.png'; 
import friendsImageBack from '../../public/Images/Friends/Friends_Content.png';
import LoversImage from '../../public/Images/Couples/Couples_Front.png'; 
import LoversImageBack from '../../public/Images/Couples/Couples_Content.png';
import DeckImage from '../../public/Images/Decks.png';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col">
      <div className="container mx-auto p-4 pt-24 flex-grow">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">Play for free</h2>
            <p className="text-lg mb-4">
              Discover a variety of questions designed to spark interesting conversations and deepen your connections with friends and loved ones. Play for free or subscribe for unlimited access to more decks with deeper questions and different themes.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
            <Link href="/friends" className="w-32 text-center bg-transparent hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 border border-purple-500 rounded">
              Friends
            </Link>
            <Link href="/couples" className="w-32 text-center bg-transparent hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 border border-purple-500 rounded">
              Couples
            </Link>
          </div>
          </div>
          <div className="flex space-x-4">
            <Image 
              src={DeckImage}
              alt="Deck"
              width={400}
              height={400}
              className="h-auto"
              priority
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">Browse Decks</h2>
        <CardScroll />
      </div>
    </div>
  );
};

export default HomePage;