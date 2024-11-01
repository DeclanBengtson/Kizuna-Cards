// components/DeckCard.js
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import deleteIcon from '../../../public/Images/buttons/Delete.png'; // Import the delete icon
import editIcon from '../../../public/Images/buttons/edit.png'; // Import the edit icon


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
    <li className="relative w-48 shadow-xl transition-transform transform hover:scale-105 rounded-3xl overflow-hidden list-none">
      <div className="cursor-pointer relative" onClick={handleViewDeck}>
        {src ? (
          <Image
            src={src}
            alt={title}
            width={200} // Use consistent dimensions
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <h3 className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
          {title}
        </h3>
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleEditDeck(); }}
            className="flex items-center justify-center w-8 h-8 bg-blue-500 bg-opacity-50 rounded-md"
          >
            <Image src={editIcon} alt="Edit" width={16} height={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteDeck(); }}
            className="flex items-center justify-center w-8 h-8 bg-red-500 bg-opacity-50 rounded-md"
          >
            <Image src={deleteIcon} alt="Delete" width={16} height={16} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default DeckCard;