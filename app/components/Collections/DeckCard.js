import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

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
            className="object-cover w-full h-40"
          />
        ) : (
          <div className="rounded-xl w-full h-32 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-col justify-between flex-grow h-32">
        <div className="flex-grow overflow-hidden">
          <h2 className="text-xl font-bold truncate">{title}</h2>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex gap-2 justify-end mt-auto">
          <button
            onClick={handleEditDeck}
            className="btn btn-ghost btn-sm"
            aria-label="Edit deck"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteDeck}
            className="btn btn-ghost btn-sm text-red-500"
            aria-label="Delete deck"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;