'use client';

import React, { useState } from 'react';
import { mockCases } from '@/constants/mockData';
import PortfolioOverview from './components/PortfolioOverview';
import { CreateCaseDrawer } from './components/CreateCaseDrawer';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

export default function MyCoincasesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const userPortfolio = mockCases.filter(c => c.isSubscribed);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Coincases</h1>
                <Button onClick={openDrawer}>
                    <Plus className="w-4 h-4 mr-2" /> Create New Case
                </Button>
            </div>
            <PortfolioOverview cases={userPortfolio} />
            {/* You can add a list of individual cases here if needed */}
            <CreateCaseDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
        </div>
    );
}