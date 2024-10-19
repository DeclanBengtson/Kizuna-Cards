import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const BrowserCard = ({ to, image, description }) => {
  return (
    <a href={to} className="card w-full md:w-100 bg-base-100 shadow-xl transition-transform transform hover:scale-105 ">
      <figure className="px-10 pt-10">
        <Image src={image} alt={description} width={100} height={100} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{description}</h2>
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