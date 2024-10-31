// components/CreateDeckCard.js
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import createDeckImage from '../../public/Images/buttons/Add.png'; // Adjust the path as necessary

const CreateDeckCard = () => {
  const router = useRouter();

  const handleCreateDeck = () => {
    router.push('/collections/create-deck');
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
      style={{ width: '200px', height: '320px' }} // Adjust width and height here
      onClick={handleCreateDeck}
    >
      <Image src={createDeckImage} alt="Create New Deck" width={60} height={60} />
    </div>
  );
};

export default CreateDeckCard;