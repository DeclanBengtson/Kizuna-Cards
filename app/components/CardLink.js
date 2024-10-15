// app/components/CardLink.js
import React from 'react';
import Link from 'next/link';

const CardLink = ({ to, image, description }) => {
  return (
    <div className="card-link">
      <Link href={to}>
          <img src={image.src} alt={description} />
          <p>{description}</p>
      </Link>
    </div>
  );
};

export default CardLink;