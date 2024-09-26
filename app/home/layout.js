'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WatchlistProvider } from '@/context/WatchlistContext';

function layout({ children }) {
  return (
    <WatchlistProvider>
      <main className={`flex flex-col min-h-dvh pb-12`}>
        <Header />
        <main className='container flex-grow py-4 pl-4 pr-4 mx-auto'>
          {children}
        </main>
        <Footer />
      </main>
    </WatchlistProvider>
  );
}

export default layout;
