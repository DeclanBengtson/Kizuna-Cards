// app/cancel/page.js
import React from 'react';
import './Cancel.css';

const Cancel = () => {
  return (
    <div className="cancel-page">
      <h1>Subscription Cancelled</h1>
      <p>Your subscription process was cancelled. If this was a mistake, you can try again.</p>
    </div>
  );
};

export default Cancel;