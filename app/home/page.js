'use client';
import React from 'react';
import CardLink from '../components/CardLink';

// Images
import friendsImage from '../../public/Images/Beige_Card.png'; 
import friendsImageBack from '../../public/Images/Beige_Card_Back.png';
import LoversImage from '../../public/Images/Lovers.png'; 
import LoversImageBack from '../../public/Images/Lovers_Back.png';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 pt-24">
      {/* Original Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4">Play for free</h2>
          <p className="text-lg">
            Discover a variety of questions designed to spark interesting conversations and deepen your connections with friends and loved ones. Play for free or subscribe for unlimited access to more decks with deeper questions and different themes.
          </p>
        </div>
        <div className="flex space-x-4">
          <CardLink to="/friends" frontImage={friendsImage} backImage={friendsImageBack} description="Questions for Friends" />
          <CardLink to="/lovers" frontImage={LoversImage} backImage={LoversImageBack} description="Questions for Lovers" />
        </div>
      </div>

      {/* Duplicated Section with Flipped Sides */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between mb-8">
        <div className="lg:w-1/2 mb-4 lg:mb-0 text-center lg:text-right">
          <h2 className="text-3xl font-bold mb-4">Play for free</h2>
          <p className="text-lg">
            Discover a variety of questions designed to spark interesting conversations and deepen your connections with friends and loved ones. Play for free or subscribe for unlimited access to more decks with deeper questions and different themes.
          </p>
        </div>
        <div className="flex space-x-4">
          <CardLink to="/friends" frontImage={friendsImage} backImage={friendsImageBack} description="Questions for Friends" />
          <CardLink to="/lovers" frontImage={LoversImage} backImage={LoversImageBack} description="Questions for Lovers" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;