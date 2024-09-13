import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { WatchlistProvider } from '@/context/WatchlistContext'

function layout({ children }) {
    return (
        <WatchlistProvider>
            <main className={`flex flex-col min-h-dvh `}>
                <Header />
                <main className="container flex-grow px-4 py-8 mx-auto">
                    {children}
                </main>
                <Footer />
            </main>
        </WatchlistProvider>
    )
}

export default layout