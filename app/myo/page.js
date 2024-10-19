'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MYO = () => {
  return (
    <h1>MYO</h1>
  );
};

// Dynamically import the withAuth HOC with no SSR
const WithAuth = dynamic(() => import('../components/withAuth'), { ssr: false });

// Create a wrapper component that applies the HOC
const MYOPage = () => (
  <WithAuth>
    <MYO />
  </WithAuth>
);

export default MYOPage;