// components/CreateDeckCard.js
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import createDeckImage from '../../../public/Images/buttons/Add.png'; // Adjust the path as necessary

const CreateDeckCard = () => {
    const router = useRouter();
  
    const handleCreateDeck = () => {
      router.push('/collections/create-deck');
    };
  
    return (
      <li 
        className="relative w-48 shadow-xl transition-transform transform hover:scale-105 rounded-lg overflow-hidden list-none cursor-pointer bg-white"
        onClick={handleCreateDeck}
      >
        <div 
          className="flex items-center justify-center"
          style={{ height: '200px' }}
        >
          <Image 
            src={createDeckImage} 
            alt="Create New Deck" 
            width={60} 
            height={60}
          />
        </div>
      </li>
    );
  };

export default CreateDeckCard;