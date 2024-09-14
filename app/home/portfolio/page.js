'use client';

import React from 'react';
import { mockCases } from '@/constants/mockData';
import PortfolioOverview from './components/PortfolioOverview';

export default function PortfolioPage() {
    const userPortfolio = mockCases.filter(c => c.isSubscribed);
    return (
        <div>
            <PortfolioOverview cases={userPortfolio} />
        </div>
    );
}