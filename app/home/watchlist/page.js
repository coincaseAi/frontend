'use client';

import { useWatchlist } from '@/context/WatchlistContext'
import CaseCard from '@/components/CaseCard'
import { toast } from 'sonner';
import { mockCases } from '@/constants/mockData';

export default function WatchlistPage() {
    const { watchlist, toggleWatchlist } = useWatchlist();





    return (
        <>
            <div className="flex flex-col gap-0.5 mb-4">
                <h1 className="text-2xl font-semibold ">Watchlist</h1>
                <p className="text-sm text-muted">View your watchlist cases , you can remove them anytime</p>

            </div>
            {watchlist.length > 0 ? <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {
                    watchlist?.map((caseId) => (
                        <CaseCard key={caseId} caseId={caseId} />
                    ))
                }
            </div> : <div className="flex items-center justify-center h-full p-4 rounded-md bg-muted/20">
                <span className="text-muted-foreground">No cases in your watchlist</span>
            </div>}
        </>
    )
}