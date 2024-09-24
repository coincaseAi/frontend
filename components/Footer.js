import React from 'react';
import Link from 'next/link';
import ToggleTheme from './ToggleTheme';

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container py-8 pr-4 mx-auto pl-7'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 font-serif font-medium'>About Coincase</h3>
            <p className='text-xs text-muted-foreground'>
              Coincase is a leading platform for investing in cryptocurrencies.
              We make it easy for you to buy, sell, and manage your digital
              assets.
            </p>
          </div>
          <div>
            <h3 className='mb-4 font-serif font-medium'>Quick Links</h3>
            <ul className='space-y-2 text-xs'>
              <li>
                <Link href='/home' className='text-muted-foreground hover:underline hover:text-primary'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/home/discover' className='text-muted-foreground hover:underline hover:text-primary'>
                  Discover
                </Link>
              </li>
              <li>
                <Link href='/home/watchlist' className='text-muted-foreground hover:underline hover:text-primary'>
                  Watchlist
                </Link>
              </li>
              <li>
                <Link href='/home/mycoincases' className='text-muted-foreground hover:underline hover:text-primary'>
                  My Coincases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 font-serif font-medium'>Contact Us</h3>
            <address className='text-xs not-italic text-muted-foreground'>
              123 Crypto Street
              <br />
              Blockchain City, BC 12345
              <br />
              Email: info@coincase.com
              <br />
              Phone: (123) 456-7890
            </address>
          </div>
        </div>
        <div className='flex items-center justify-between mt-8'>
          <div className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Coincase. All rights reserved.
          </div>
          <ToggleTheme />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
