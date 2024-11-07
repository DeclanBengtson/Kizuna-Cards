import React from 'react';
import Card from './Card'; // Assuming Card is in the same directory

const PersonalDeck = ({ deck }) => {
  const { title, style } = deck;

  return (
    <div className="flex flex-col items-center">
      <Card color={style.color} title={title} />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700">Explore this deck to find insightful questions.</p>
      </div>
    </div>
  );
};

export default PersonalDeck;
