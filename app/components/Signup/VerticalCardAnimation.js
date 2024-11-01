import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Import images directly
import friendsImage from '../../../public/Images/Friends/Friends_Front.png'; 
import LoversImage from '../../../public/Images/Couples/Couples_Front.png'; 
import familyImage from '../../../public/Images/Family/Family_Front.png'; 
import newConnectionsImage from '../../../public/Images/New_Connections/NewConnections_Front.png'; 
import WorkColleaguesImage from '../../../public/Images/WorkColleagues/WorkColleagues_Front.png'; 
import ChristmasImage from '../../../public/Images/Christmas/Christmas_Front.png';

const VerticalCardAnimation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define the card data directly within the component
  const cards = [
    { image: friendsImage, alt: 'Friends Card' },
    { image: LoversImage, alt: 'Couples Card' },
    { image: familyImage, alt: 'Family Card' },
    { image: newConnectionsImage, alt: 'New Connections Card' },
    { image: WorkColleaguesImage, alt: 'Work Colleagues Card' },
    { image: ChristmasImage, alt: 'Christmas Card' },
  ];

  // Double the cards array to create seamless loop
  const doubledCards = [...cards, ...cards];

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Left column - scrolling up */}
      <div className="absolute left-4 w-40 h-full">
        <div className="animate-scroll-up flex flex-col gap-4">
          {doubledCards.map((card, index) => (
            <div
              key={`up-${index}`}
              className="w-40 h-60 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Image src={card.image} alt={card.alt} width={200} height={300} className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column - scrolling down */}
      <div className="absolute right-4 w-40 h-full">
        <div className="animate-scroll-down flex flex-col gap-4">
          {doubledCards.map((card, index) => (
            <div
              key={`down-${index}`}
              className="w-40 h-60 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Image src={card.image} alt={card.alt} width={200} height={300} className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCardAnimation;