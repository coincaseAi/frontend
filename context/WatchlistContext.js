'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const toggleWatchlist = (caseId) => {
    setWatchlist((prev) => {
      const isWatchlisted = prev.includes(caseId);
      let newWatchlist;
      if (isWatchlisted) {
        newWatchlist = prev.filter((id) => id !== caseId);
      } else {
        newWatchlist = [...prev, caseId];
      }
      // Save to localStorage
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};



export const useWatchlist = () => useContext(WatchlistContext);
