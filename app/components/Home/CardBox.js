import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import images directly
import friendsImage from '../../../public/Images/Friends/Friends_Content.png'; 
import loversImage from '../../../public/Images/Couples/Couples_Content.png'; 
import familyImage from '../../../public/Images/Family/Family_Content.png'; 
import newConnectionsImage from '../../../public/Images/New_Connections/NewConnections_Content.png'; 
import workColleaguesImage from '../../../public/Images/WorkColleagues/WorkColleagues_Content.png'; 
import christmasImage from '../../../public/Images/Christmas/Christmas_Content.png';

const CardBox = () => {
  const cards = [
    { image: friendsImage, alt: 'Friends Card' },
    { image: loversImage, alt: 'Couples Card' },
    { image: familyImage, alt: 'Family Card' },
    { image: newConnectionsImage, alt: 'New Connections Card' },
    { image: workColleaguesImage, alt: 'Work Colleagues Card' },
    { image: christmasImage, alt: 'Christmas Card' },
  ];

  return (
    <div className="flex justify-center p-2">
      <div className="bg-gray-100 p-3 rounded-2xl shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {cards.map((card, index) => (
            <Link href="/browse" key={index} passHref>
              <div
                className="w-[160px] h-[240px] bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
              >
                <Image 
                  src={card.image} 
                  alt={card.alt} 
                  width={160} 
                  height={240} 
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBox;