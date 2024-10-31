'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Deck from '../../components/Deck';

import FrontImage from '../../../public/Images/Couples/Couples_Front.png';
import BackImage from '../../../public/Images/Couples/Couples_Back.png';
import Wallpaper from '../../../public/Images/Backgrounds/Couples.png';

const DeckPage = () => {
  const params = useParams();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!params.id) {
        setError('No deck ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/decks/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setDeck(data);
        } else {
          setError('Failed to fetch deck');
        }
      } catch (error) {
        setError('Error fetching deck: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Deck not found</p>
      </div>
    );
  }

  const initialCards = deck.questions.map((question, index) => ({
    text: question,
    isFlipped: false,
    isSlid: false,
    zIndex: index + 1,
  }));

  const cardStyles = "font-titanOne font-bold text-pink-400 text-3xl ";

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Wallpaper.src})` }}
    >
      <Deck
        initialCards={initialCards}
        questions={deck.questions}
        customStyles={`lovers-card ${cardStyles}`}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default DeckPage;