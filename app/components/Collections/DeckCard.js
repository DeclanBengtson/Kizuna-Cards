import React from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import Card from './Card'; // Import the Card component

const DeckCard = ({ deck, onDelete }) => {
  const router = useRouter();

  const handleViewDeck = () => {
    router.push(`/decks/${deck._id}`);
  };

  const handleEditDeck = (e) => {
    e.stopPropagation();
    router.push(`/collections/${deck._id}/edit`);
  };

  const handleDeleteDeck = async (e) => {
    e.stopPropagation();
    const response = await fetch(`/api/decks/${deck._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(deck._id);
    } else {
      console.error('Failed to delete deck');
    }
  };

  const { title, description = "No description available", style } = deck;

  return (
    <div
      onClick={handleViewDeck}
      className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <Card color={style.color} title={title} />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex space-x-2 mt-2">
          <button onClick={handleEditDeck} className="text-gray-500 hover:text-gray-700">
            <Pencil size={20} />
          </button>
          <button onClick={handleDeleteDeck} className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
