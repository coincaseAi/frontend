'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { useAccount } from 'wagmi';
import ConnectWallet from '@/components/ConnectWallet';

function layout({ children }) {
  const { isConnected } = useAccount()
  return (
    <WatchlistProvider>
      <main className={`flex flex-col min-h-dvh pb-12`}>
        <Header />
        <main className='container flex-grow py-4 pl-4 pr-4 mx-auto'>
          {isConnected ? children : <div className='flex flex-col items-center justify-center h-full gap-4'>
            <h1 className='text-2xl font-bold '>Please connect your wallet</h1>
            <p className='text-muted-foreground'> You need to connect your wallet to use this app</p>
            <ConnectWallet />
          </div>}
        </main>
        <Footer />
      </main>
    </WatchlistProvider>
  );
}

export default layout;
