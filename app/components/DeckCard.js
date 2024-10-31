// components/DeckCard.js
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DeckCard = ({ deck, onDelete }) => {
  const router = useRouter();

  const handleViewDeck = () => {
    router.push(`/decks/${deck._id}`);
  };

  const handleEditDeck = () => {
    router.push(`/collections/${deck._id}/edit`);
  };

  const handleDeleteDeck = async () => {
    const response = await fetch(`/api/decks/${deck._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(deck._id);
    } else {
      console.error('Failed to delete deck');
    }
  };

  const { title, style } = deck;
  const { src } = style.imageUrl || {};

  return (
    <li className="relative w-48 shadow-xl transition-transform transform hover:scale-105 rounded-lg overflow-hidden">
      <div className="cursor-pointer" onClick={handleViewDeck}>
        {src ? (
          <Image
            src={src}
            alt={title}
            width={100} 
            height={100}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 flex justify-end items-start p-1 space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleEditDeck(); }}
            className="btn btn-info text-xs"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteDeck(); }}
            className="btn btn-danger text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default DeckCard;