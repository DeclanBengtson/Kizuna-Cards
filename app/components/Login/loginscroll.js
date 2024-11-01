import React from 'react';
import Image from 'next/image';

// Import images directly
import friendsImage from '../../../public/Images/Friends/Friends_Front.png'; 
import LoversImage from '../../../public/Images/Couples/Couples_Front.png'; 
import familyImage from '../../../public/Images/Family/Family_Front.png'; 
import newConnectionsImage from '../../../public/Images/New_Connections/NewConnections_Front.png'; 
import WorkColleaguesImage from '../../../public/Images/WorkColleagues/WorkColleagues_Front.png'; 
import ChristmasImage from '../../../public/Images/Christmas/Christmas_Front.png';

const LoginScroll = () => {
  // Define the card data directly within the component
  const cards = [
    { image: friendsImage, alt: 'Friends Card' },
    { image: LoversImage, alt: 'Couples Card' },
    { image: familyImage, alt: 'Family Card' },
    { image: newConnectionsImage, alt: 'New Connections Card' },
    { image: WorkColleaguesImage, alt: 'Work Colleagues Card' },
    { image: ChristmasImage, alt: 'Christmas Card' },
  ];

  // Duplicate cards to create a seamless loop
  const duplicatedCards = [...cards, ...cards];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className="inline-flex space-x-4 animate-scroll">
        {duplicatedCards.map((card, index) => (
          <div
            key={`${card.alt}-${index}`}
            className="flex-none w-48 h-72 bg-white shadow-lg overflow-hidden rounded-2xl"
          >
            <Image src={card.image} alt={card.alt} width={200} height={300} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginScroll;