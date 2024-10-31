// components/DeckStyleSelector.js
import React, { useState } from 'react';
import Image from 'next/image';

// Images
import friendsImage from '../../public/Images/Friends/Friends_Back.png';
import LoversImage from '../../public/Images/Couples/Couples_Back.png';
import familyImage from '../../public/Images/Family/Family_Back.png';
import newConnectionsImage from '../../public/Images/New_Connections/NewConnections_Back.png';
import WorkColleaguesImage from '../../public/Images/WorkColleagues/WorkColleagues_Back.png';
import ChristmasImage from '../../public/Images/Christmas/Christmas_Back.png';

// Toggle Images
import expandMoreImage from '../../public/Images/buttons/down.png';
import expandLessImage from '../../public/Images/buttons/Up.png';

const deckStyles = [
  { id: 1, name: 'Pink', imageUrl: LoversImage },
  { id: 2, name: 'Green', imageUrl: familyImage },
  { id: 3, name: 'Blue', imageUrl: WorkColleaguesImage },
  { id: 4, name: 'Purple', imageUrl: newConnectionsImage },
  { id: 5, name: 'Orange', imageUrl: friendsImage },
  { id: 6, name: 'Christmas', imageUrl: ChristmasImage },
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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center"
      >
        <span>{selectedStyle ? selectedStyle.name : 'Select Deck Style'}</span>
        <Image
          src={isOpen ? expandLessImage : expandMoreImage}
          alt={isOpen ? 'Collapse' : 'Expand'}
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 grid grid-cols-3 gap-4">
          {deckStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleSelect(style)}
              className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <Image
                src={style.imageUrl}
                alt={style.name}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <span className="mt-2">{style.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckStyleSelector;