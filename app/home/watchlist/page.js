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
        <div>
            <h1 className="mb-4 text-2xl font-bold">Your Watchlist</h1>
            {watchlistedCases.length === 0 ? (
                <p>You haven't added any cases to your watchlist yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {watchlistedCases.map((caseData) => (
                        <CaseCard
                            key={caseData.id}
                            caseData={caseData}
                            onToggleWatchlist={() => handleToggleWatchlist(caseData.id)}
                            isWatchlisted={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}