// app/layout.js
'use client'; // This makes the entire component a Client Component

import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/footer'; // Import the Footer component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <div className="App flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}