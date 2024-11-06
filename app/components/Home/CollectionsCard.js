import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DeckCard = ({ deck }) => {
  const router = useRouter();

  const handleViewDeck = () => {
    router.push(`/decks/${deck._id}`);
  };

  const { title, description = "No description available", style } = deck;
  const { src } = style.imageUrl || {};

  return (
    <div 
      onClick={handleViewDeck}
      className="flex w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105 p-4 rounded-lg cursor-pointer h-48"
    >
      <div className="flex-shrink-0 relative w-24">
        {src ? (
          <Image
            src={src}
            alt={title}
            width={200}
            height={600}
            className="object-cover w-full h-40 rounded-lg"
          />
        ) : (
          <div className="rounded-xl w-full h-32 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-col justify-between flex-grow h-44 relative">
        <div className="flex-grow overflow-hidden">
          <h2 className="text-xl font-bold truncate">{title}</h2>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
