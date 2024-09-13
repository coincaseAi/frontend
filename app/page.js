import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LandingPage } from '@/components/landing-page';
export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-background text-foreground'>
      <LandingPage />
    </div>
  );
}
