import React from 'react';
import Link from 'next/link';
import './CardLink.css';

const CardLink = ({ to, frontImage, backImage, description }) => {
  return (
    <Link href={to} legacyBehavior>
      <a className="card-link">
        <div className="card-inner">
          <div className="card-front" style={{ backgroundImage: `url(${frontImage.src})` }}>
            {/* Front side content */}
          </div>
          <div className="card-back" style={{ backgroundImage: `url(${backImage.src})` }}>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardLink;