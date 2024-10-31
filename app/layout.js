// app/layout.js
'use client';

import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Couples Questions</title>
        <meta name="description" content="Explore engaging questions for couples to deepen your relationship and understanding." />
        <meta name="keywords" content="couples, relationship questions, love, communication" />
        <meta property="og:title" content="Couples Questions" />
        <meta property="og:description" content="Explore engaging questions for couples to deepen your relationship." />
        {/* <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Couples Questions" />
        <meta name="twitter:description" content="Explore engaging questions for couples to deepen your relationship." />
        {/* <meta name="twitter:image" content="/path/to/image.jpg" /> */}
        <meta name="author" content="Couples Questions" />
      </Head>
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