import React from 'react'
import Link from 'next/link'
import ToggleTheme from './ToggleTheme'

function Footer() {
    return (
        <footer className="border-t">
            <div className="container px-4 py-8 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 font-bold">About Coincase</h3>
                        <p className="text-sm text-muted-foreground">
                            Coincase is a leading platform for investing in cryptocurrencies.
                            We make it easy for you to buy, sell, and manage your digital assets.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/home" className="hover:underline">Home</Link></li>
                            <li><Link href="/home/discover" className="hover:underline">Discover</Link></li>
                            <li><Link href="/home/watchlist" className="hover:underline">Watchlist</Link></li>
                            <li><Link href="/home/mycoincases" className="hover:underline">My Coincases</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-bold">Contact Us</h3>
                        <address className="text-sm not-italic text-muted-foreground">
                            123 Crypto Street<br />
                            Blockchain City, BC 12345<br />
                            Email: info@coincase.com<br />
                            Phone: (123) 456-7890
                        </address>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Coincase. All rights reserved.
                    </div>
                    <ToggleTheme />
                </div>
            </div>
        </footer>
    )
}

export default Footer