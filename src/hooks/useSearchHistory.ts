import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nile_search_history_v1';

export interface HistoryItem {
  query: string;
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Storage error
    }
  }, [history]);

  const addQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== trimmed.toLowerCase());
      return [{ query: trimmed, timestamp: Date.now() }, ...filtered].slice(0, 30);
    });
  };

  const removeQuery = (query: string) => {
    setHistory((prev) => prev.filter((item) => item.query !== query));
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { history, addQuery, removeQuery, clearHistory };
}
