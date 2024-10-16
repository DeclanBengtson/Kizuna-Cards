import React from 'react';
import CardLink from '../components/CardLink';
import CardScroll from '../components/CardScroll';

// Images
import friendsImage from '../../public/Images/Beige_Card.png'; 
import LoversImage from '../../public/Images/Lovers.png'; 
import MarriedImage from '../../public/Images/Married.png'; 
import GirlsImage from '../../public/Images/Girls.png'; 
import BoysImage from '../../public/Images/Boys.png'; 
import PurpleImage from '../../public/Images/Purple.png'; 
import GreenImage from '../../public/Images/Light_green.png';

import './HomePage.css';

const cards = [
  { image: PurpleImage, alt: 'Purple' },
  { image: GreenImage, alt: 'Green' },
  { image: MarriedImage, alt: 'Married' },
  { image: GirlsImage, alt: 'Girls' },
  { image: BoysImage, alt: 'Boys' },
  { image: PurpleImage, alt: 'Purple' },
  { image: GreenImage, alt: 'Green' },
  { image: MarriedImage, alt: 'Married' },
  { image: GirlsImage, alt: 'Girls' },
  { image: BoysImage, alt: 'Boys' },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="inline-container">
        <div className="text-content">
          <h2>Play for free</h2>
          <p>Discover a variety of questions designed to spark interesting conversations and deepen your connections with friends and loved ones. Play for free or subscribe for unlimited access to more decks with deeper questions and different themes.</p>
        </div>
        <div className="card-links">
          <CardLink to="/friends" image={friendsImage} description="Questions for Friends" />
          <CardLink to="/lovers" image={LoversImage} description="Questions for Lovers" />
        </div>
      </div>
      <h2>Premium Decks</h2>
      <CardScroll cards={cards} />
    </div>
  );
};

export default HomePage;