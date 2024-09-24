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
            <div className="flex flex-col gap-0.5 mb-4">
                <h1 className="font-serif text-2xl font-semibold">Discover</h1>
                <p className="text-sm text-muted">Search for curated cases created by our community</p>
            </div>
            <div className="flex w-full border border-muted ">
                <Input
                    type="search"
                    placeholder="Search Coincases"
                    className="flex-grow rounded-none focus:ring-transparent"
                />
                <Button className="rounded-none">
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <CreatorsList />
            </div>
        </>
    )
}