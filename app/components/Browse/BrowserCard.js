import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const BrowserCard = ({ to, image, description }) => {
  return (
    <a href={to} className="flex w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105 p-4 rounded-lg">
      <div className="flex-shrink-0">
        <Image src={image} alt={description} width={100} height={100} className="rounded-xl" />
      </div>
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold">{description}</h2>
        <p className="text-gray-600">Explore this deck to find insightful questions.</p>
      </div>
    </a>
  );
};

BrowserCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired, // Adjusted to object for next/image
  description: PropTypes.string.isRequired,
};

export default BrowserCard;