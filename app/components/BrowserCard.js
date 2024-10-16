import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import './BrowserCard.css';

const BrowserCard = ({ to, image, description }) => {
  return (
    <a href={to} className="browser-card">
      <Image src={image} alt={description} width={100} height={100} />
      <div className="card-description">
        <p>{description}</p>
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