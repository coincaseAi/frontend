import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LandingPage } from '@/components/landing-page';
export default function Home() {
  return (
    <div className='bg-[url("/images/gradient.webp")] flex items-center justify-center min-h-screen p-4   text-foreground'>
      <LandingPage />
    </div>
  );
}
