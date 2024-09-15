'use client';

import React, { useState } from 'react';
import { mockCases } from '@/constants/mockData';
import { CreateCaseDrawer } from './components/CreateCaseDrawer';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';
import { toast } from 'sonner';
import MyCoinCaseCard from '@/components/MyCoinCaseCard';

export default function MyCoincasesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const userCases = mockCases.filter(c => c.createdByUser);



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
                    <MyCoinCaseCard
                        key={caseData.id}
                        caseData={caseData}
                    />
                ))}
            </div>
        </div>
    );
}