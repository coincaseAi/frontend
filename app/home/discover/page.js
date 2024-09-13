'use client';

import { Input } from "@/components/ui/input"
import FilterOptions from './components/filter'
import CaseCard from '@/components/CaseCard'
import { useWatchlist } from '@/context/WatchlistContext'
import { toast } from 'sonner';
import { mockCases } from '@/constants/mockData';

export default function DiscoverPage() {
    const { watchlist, toggleWatchlist } = useWatchlist();

    const handleToggleWatchlist = (caseId) => {
        toggleWatchlist(caseId);
        toast.success('Watchlist updated');
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row">
                <Input
                    type="search"
                    placeholder="Search Coincases"
                    className="w-full"
                />
                <FilterOptions />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {mockCases.map((caseData) => (
                    <CaseCard
                        key={caseData.id}
                        caseData={caseData}
                        onToggleWatchlist={() => handleToggleWatchlist(caseData.id)}
                        isWatchlisted={watchlist.includes(caseData.id)}
                    />
                ))}
            </div>
        </div>
    )
}