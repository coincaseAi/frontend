import React from 'react';
import CreatorsList from '@/components/CreatorsList';

const CreatorsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Case Creators</h1>
            <CreatorsList />
        </div>
    );
};

export default CreatorsPage;