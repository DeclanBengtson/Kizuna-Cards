// app/layout.js
'use client'; // This makes the entire component a Client Component

import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <div className="App">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}