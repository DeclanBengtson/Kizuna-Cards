// components/DeckStyleSelector.js
import React, { useState } from 'react';
import Image from 'next/image';

import LoversImage from '../../public/Images/Couples/Couples_Front.png'; 
import familyImage from '../../public/Images/Family/Family_Front.png'; 
import WorkColleaguesImage from '../../public/Images/WorkColleagues/WorkColleagues_Front.png'; 

const deckStyles = [
  { id: 1, name: 'Pink', imageUrl: LoversImage },
  { id: 2, name: 'Green', imageUrl: familyImage },
  { id: 3, name: 'Blue', imageUrl: WorkColleaguesImage },
];

const DeckStyleSelector = ({ selectedStyle, setSelectedStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (style) => {
    setSelectedStyle(style);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center"
      >
        <span>{selectedStyle ? selectedStyle.name : 'Select Deck Style'}</span>
        <span className="material-icons">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {deckStyles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleSelect(style)}
              className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={style.imageUrl}
                alt={style.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span>{style.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckStyleSelector;