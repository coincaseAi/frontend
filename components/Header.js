'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ConnectWallet from './ConnectWallet';
import {
  Bookmark,
  CircleUser,
  Package,
  Search,
  SquareUser,
} from 'lucide-react';
import GradientAvatar from './GradientAvatar';
import { useAccount } from 'wagmi';

function NavLink({ href, children, icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={` ${
        isActive ? 'opacity-100 border-b-2 border-white' : 'opacity-20 '
      } text-foreground flex flex-col items-center justify-center gap-1 py-4 text-xs  focus:text-foreground`}
    >
      {icon}
      {children}
    </Link>
  );
}
function Header() {
  const { address } = useAccount();
  return (
    <header className=''>
      <div className='container flex items-center justify-between gap-1 py-4 pr-4 mx-auto pl-7'>
        <div className='text-xl font-bold text-primary'>Coincase</div>
        {/* <w3m-button /> */}
        <ConnectWallet />
      </div>
      {/* bottom nav */}
      <nav
        className='fixed bottom-0 left-0 z-50 w-full mx-auto overflow-x-auto border-t border-transparent border-gradient bg-background scrollbar-none lg:static lg:border-b'
        style={{}}
      >
        <div className='flex items-center justify-around max-w-xl px-8 mx-auto space-x-8'>
          <NavLink
            href='/home/discover'
            icon={<Search size={20} className='lg:hidden' />}
          >
            Discover
          </NavLink>
          <NavLink
            href='/home/watchlist'
            icon={<Bookmark size={20} className='lg:hidden' />}
          >
            Watchlist
          </NavLink>
          <NavLink
            href='/home/mycoincases'
            icon={<Package size={20} className='lg:hidden' />}
          >
            My Cases
          </NavLink>
          <NavLink
            href='/home/portfolio'
            icon={<CircleUser size={20} className='lg:hidden' />}
          >
            Portfolio
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
