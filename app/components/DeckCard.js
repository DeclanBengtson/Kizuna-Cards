// components/DeckCard.js
import React from 'react';
import Image from 'next/image';

const DeckCard = ({ deck }) => {
  return (
    <li className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
      <Image
        src={deck.imageUrl}
        alt={deck.title}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{deck.title}</h3>
        <p className="text-gray-700">{deck.description}</p>
      </div>
    </li>
  );
};

export default DeckCard;