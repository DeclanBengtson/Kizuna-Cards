import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/New_Connections/NewConnections_Front.png';
import BackImage from '../../public/Images/New_Connections/NewConnections_Back.png';
import NewConnectionsQuestions from '../../questions/NewConnectionsQuestions.json';

const NewConnections = () => {
  const initialCards = NewConnectionsQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

 // Replace inline fontStyle with Tailwind classes
 const cardStyles = "font-titanOne font-bold text-orange-400 text-3xl ";

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"

    >
      <Deck
        initialCards={initialCards}
        questions={NewConnectionsQuestions}
        customStyles={`family-card ${cardStyles}`}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default NewConnections;