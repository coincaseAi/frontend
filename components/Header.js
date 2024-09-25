'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ConnectWallet from './ConnectWallet'
import { Bookmark, Package, Search, SquareUser } from 'lucide-react'
import GradientAvatar from './GradientAvatar'
import { useAccount } from 'wagmi'

function NavLink({ href, children, icon }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={` ${isActive ? 'text-primary' : 'text-muted-foreground'} flex flex-col items-center justify-center gap-1 text-xs fucus:text-foreground`}
        >
            {icon}
            {children}
        </Link>
    )
}
function Header() {
    const { address } = useAccount()
    return (
        <header className="">
            <div className="container flex items-center justify-between gap-1 py-4 pr-4 mx-auto pl-7">

                {address ? <GradientAvatar address={address} size={36} /> : <div className="text-xl font-bold text-primary">Coincase</div>}
                {/* <w3m-button /> */}
                <ConnectWallet />
            </div>
            {/* bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 w-full py-4 mx-auto overflow-x-auto border-t border-transparent bg-background scrollbar-none lg:static lg:border-b" style={{

                borderImage: 'linear-gradient(to right, transparent, hsl(var(--muted)), transparent) 1'
            }}>
                <div className="flex items-center justify-around max-w-xl px-8 mx-auto space-x-8">
                    <NavLink href="/home/discover" icon={<Search size={20} />}>
                        Discover
                    </NavLink>
                    <NavLink href="/home/watchlist" icon={<Bookmark size={20} />}>Watchlist</NavLink>
                    <NavLink href="/home/mycoincases" icon={<Package size={20} />}>My Cases</NavLink>
                    <NavLink href="/home/portfolio" icon={<SquareUser size={20} />}>Portfolio</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header