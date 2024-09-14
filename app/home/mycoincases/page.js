'use client';

import React, { useState } from 'react';
import { mockCases } from '@/constants/mockData';
import { CreateCaseDrawer } from './components/CreateCaseDrawer';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import CaseCard from "@/components/CaseCard"; // Add this import
import { useWatchlist } from '@/context/WatchlistContext';
import { toast } from 'sonner';

export default function MyCoincasesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const userCases = mockCases.filter(c => c.createdByUser);
    const { watchlist, toggleWatchlist } = useWatchlist();
    const handleToggleWatchlist = (caseId) => {
        toggleWatchlist(caseId);
        toast.success('Watchlist updated');
    };


    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Coincases</h1>
                <Button size="icon" onClick={openDrawer}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <CreateCaseDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {userCases.map((caseData) => (
                    <CaseCard
                        key={caseData.id}
                        caseData={caseData}
                        onToggleWatchlist={() => handleToggleWatchlist(caseData.id)}
                        isWatchlisted={watchlist.includes(caseData.id)}
                    />
                ))}
            </div>
        </div>
    );
}