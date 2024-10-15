// app/components/CardLink.js
import React from 'react';
import Link from 'next/link';
import './CardLink.css';

const CardLink = ({ to, image, description }) => {
  return (
    <Link href={to} legacyBehavior>
      <a className="card-link">
        <div className="card-inner">
          <div className="card-front" style={{ backgroundImage: `url(${image.src})` }}>
            {/* Front side content */}
          </div>
          <div className="card-back">
            <p>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardLink;