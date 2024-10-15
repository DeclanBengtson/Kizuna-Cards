import React from 'react';
import PropTypes from 'prop-types';
import './BrowserCard.css';

const BrowserCard = ({ to, image, description }) => {
  return (
    <a href={to} className="browser-card">
      <image src={image} alt={description} />
      <div className="card-description">
        <p>{description}</p>
      </div>
    </a>
  );
};

BrowserCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BrowserCard;