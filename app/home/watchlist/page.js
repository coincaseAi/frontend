'use client';

import { useWatchlist } from '@/context/WatchlistContext'
import CaseCard from '@/components/CaseCard'
import { toast } from 'sonner';
import { mockCases } from '@/constants/mockData';

export default function WatchlistPage() {
    const { watchlist, toggleWatchlist } = useWatchlist();

    const handleToggleWatchlist = (caseId) => {
        toggleWatchlist(caseId);
        toast.success('Removed from watchlist');
    };

    const watchlistedCases = mockCases.filter(caseData => watchlist.includes(caseData.id));

    return (
        <>
            <div className="flex flex-col gap-0.5 mb-4">
                <h1 className="text-2xl font-semibold ">Watchlist</h1>
                <p className="text-sm text-muted">View your watchlist cases , you can remove them anytime</p>
            </div>
        </>
    )
}