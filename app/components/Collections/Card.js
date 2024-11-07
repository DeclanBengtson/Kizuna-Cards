import React from 'react';

const Card = ({ color, title }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-24 h-36 rounded-lg shadow-md ${color} p-2 text-white`}>
      <div className="text-center font-bold text-sm">{title}</div>
      <div className="mt-2">
        {/* Simple icon representation */}
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v2h-2v-2zm1-14a8 8 0 110 16 8 8 0 010-16z" />
        </svg>
      </div>
    </div>
  );
};

export default Card;
