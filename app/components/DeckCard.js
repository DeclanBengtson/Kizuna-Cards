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

  const { title, description, style } = deck;
  const { src } = style.imageUrl || {};

  return (
    <li className="flex w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105 p-4 rounded-lg">
      <div className="flex-shrink-0">
        {src ? (
          <Image
            src={src}
            alt={title}
            width={100}
            height={100}
            className="rounded-xl"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="ml-4 flex flex-col justify-center flex-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleViewDeck}
            className="btn btn-secondary"
          >
            View Deck
          </button>
          <button
            onClick={handleEditDeck}
            className="btn btn-info"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteDeck}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default DeckCard;