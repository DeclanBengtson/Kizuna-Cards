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

  const { title, description, imageUrl } = deck;
  const { src, width, height } = imageUrl || {};

  return (
    <li className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
      {src ? (
        <Image
          src={src}
          alt={title}
          width={width}
          height={height}
          className="w-16 h-16 rounded-full mr-4"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
      <button
        onClick={handleViewDeck}
        className="btn btn-secondary ml-4"
      >
        View Deck
      </button>
      <button
        onClick={handleEditDeck}
        className="btn btn-info ml-2"
      >
        Edit
      </button>
      <button
        onClick={handleDeleteDeck}
        className="btn btn-danger ml-2"
      >
        Delete
      </button>
    </li>
  );
};

export default DeckCard;