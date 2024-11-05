// app/layout.js
'use client';

import { Poppins } from 'next/font/google'; // Correct import
import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Head from 'next/head';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Couples Questions</title>
        <meta name="description" content="Explore engaging questions for couples to deepen your relationship and understanding." />
        <meta name="keywords" content="couples, relationship questions, love, communication" />
        <meta property="og:title" content="Couples Questions" />
        <meta property="og:description" content="Explore engaging questions for couples to deepen your relationship." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Couples Questions" />
        <meta name="twitter:description" content="Explore engaging questions for couples to deepen your relationship." />
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
