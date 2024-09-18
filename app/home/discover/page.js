'use client';

import { Input } from "@/components/ui/input"
import FilterOptions from './components/filter'
import CaseCard from '@/components/CaseCard'
import { useWatchlist } from '@/context/WatchlistContext'
import { toast } from 'sonner';
import { mockCases } from '@/constants/mockData';
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import CreatorsList from "@/components/CreatorsList";

export default function DiscoverPage() {
    const { watchlist, toggleWatchlist } = useWatchlist();

    const handleToggleWatchlist = (caseId) => {
        toggleWatchlist(caseId);
        toast.success('Watchlist updated');
    };

    return (
        <>
            <div className="flex justify-between gap-2 mb-2 ">
                <Input
                    type="search"
                    placeholder="Search Coincases"
                    className="w-full"
                />
                <Button >
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    Search

                </Button>
                {/* <FilterOptions /> */}
            </div>
            {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {mockCases.map((caseData) => (
                    <CaseCard
                        key={caseData.id}
                        caseData={caseData}
                        onToggleWatchlist={() => handleToggleWatchlist(caseData.id)}
                        isWatchlisted={watchlist.includes(caseData.id)}
                    />
                ))}
            </div> */}
            <CreatorsList />
        </>
    )
}