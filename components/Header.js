'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

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
                <div className="text-2xl font-bold text-primary">Coincase</div>
                <Button >Connect Wallet</Button>
                {/* <button onClick={() => {
                    document.documentElement.classList.toggle('dark')
                }}>
                    {
                        document.documentElement.classList.contains('dark') ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />
                    }
                </button> */}
            </div>
            <nav className="container flex w-full px-4 mx-auto overflow-x-auto ">
                <div className="flex space-x-8">
                    <NavLink href="/home/discover">Discover</NavLink>
                    <NavLink href="/home/watchlist">Watchlist</NavLink>
                    <NavLink href="/home/mycoincases">My Coincases</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header