import React from 'react'
import { useWatchlist } from '@/context/WatchlistContext'
import { Bookmark } from 'lucide-react';

function AddToWatchList(params) {
    const { caseId, className, rest } = params
    const { isWatchlisted, toggleWatchlist } = useWatchlist();

    return (
        caseId ?
            <button
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the bookmark
                    toggleWatchlist(caseId);
                }}
                className={`z-50 transition-colors  ${className}`}
            >
                <Bookmark className={`w-6 h-6 ${isWatchlisted(caseId) ? 'fill-primary stroke-primary' : 'fill-muted stroke-muted-foreground'} `} />
            </button>
            : null
    )
}

export default AddToWatchList