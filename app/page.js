import React from 'react';
import { LandingPage } from '@/components/LandingPage';
export default function Home() {
  return (
    <div className='bg-[url("/images/gradient.webp")] flex items-center justify-center min-h-screen p-4   text-foreground'>
      <LandingPage />
    </div>
  );
}