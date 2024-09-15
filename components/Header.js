'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ConnectWallet from './ConnectWallet'

function NavLink({ href, children }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`pb-2 whitespace-nowrap ${isActive
                ? 'text-primary border-b-2 border-primary '
                : 'text-muted-foreground hover:text-foreground transition-colors'
                }`}
        >
            {children}
        </Link>
    )
}



function Header() {

    return (
        <header className="border-b">
            <div className="container flex items-center justify-between px-4 py-4 mx-auto">
                <div className="text-xl font-bold text-primary">Coincase</div>
                {/* <ConnectWallet /> */}             <w3m-button />


            </div>
            <nav className="container flex w-full px-4 mx-auto overflow-x-auto scrollbar-none ">
                <div className="flex space-x-8">
                    <NavLink href="/home/discover">Discover</NavLink>
                    <NavLink href="/home/watchlist">Watchlist</NavLink>
                    <NavLink href="/home/mycoincases">My Coincases</NavLink>
                    <NavLink href="/home/portfolio">Portfolio</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header