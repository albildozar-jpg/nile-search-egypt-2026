import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Sparkles, ArrowLeft } from 'lucide-react';

interface SearchBoxProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  size?: 'large' | 'compact';
  autoFocus?: boolean;
  history?: { query: string; timestamp: number }[];
  onSelectHistory?: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  initialQuery = '',
  onSearch,
  size = 'large',
  autoFocus = false,
  history = [],
  onSelectHistory,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal state if initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Fetch real auto-suggestions
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // Show recent history or top Egyptian queries
      const recent = history.slice(0, 5).map((h) => h.query);
      if (recent.length > 0) {
        setSuggestions(recent);
      } else {
        fetch('/api/suggest')
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.suggestions) {
              setSuggestions(data.suggestions);
            }
          })
          .catch(() => {});
      }
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        }
      } catch {
        // Ignore
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, history]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalQuery = selectedIndex >= 0 && suggestions[selectedIndex] ? suggestions[selectedIndex] : query;
    if (!finalQuery.trim()) return;
    setIsOpen(false);
    onSearch(finalQuery.trim());
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions(history.slice(0, 5).map((h) => h.query));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isLarge = size === 'large';

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className={`relative flex items-center bg-white border transition-all duration-200 ${
            isOpen ? 'rounded-t-2xl rounded-b-none shadow-lg border-slate-300' : 'rounded-2xl shadow-sm hover:shadow-md border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100'
          } ${isLarge ? 'py-3.5 px-4 sm:px-5' : 'py-2 px-3 sm:px-4'}`}
        >
          {/* Search Icon */}
          <Search
            className={`text-slate-400 shrink-0 ml-3 transition-colors ${
              query ? 'text-red-600' : ''
            } ${isLarge ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'}`}
          />

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            placeholder="ابحث في مصر والويب... مثال: وزارة الصحة، الأهلي، سعر الذهب، الأقصر"
            className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium ${
              isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
            dir="auto"
          />

          {/* Clear Button (X) */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors shrink-0 ml-2 cursor-pointer"
              title="مسح البحث"
            >
              <X className={isLarge ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-4 h-4'} />
            </button>
          )}

          {/* Submit Search Action Button */}
          <button
            type="submit"
            className={`bg-[#0B0F19] hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-150 flex items-center gap-1.5 shrink-0 cursor-pointer ${
              isLarge ? 'px-4 py-2 text-sm sm:text-base' : 'px-3 py-1.5 text-xs sm:text-sm'
            }`}
          >
            <span>بحث</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Autocomplete / History Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full right-0 left-0 bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in-50 duration-150">
          <div className="py-1">
            {suggestions.map((suggestion, idx) => {
              const isSelected = idx === selectedIndex;
              const isFromHistory = history.some((h) => h.query.toLowerCase() === suggestion.toLowerCase());

              return (
                <button
                  key={`${suggestion}-${idx}`}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    setIsOpen(false);
                    onSearch(suggestion);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-right px-4 py-2.5 flex items-center justify-between text-sm transition-colors cursor-pointer ${
                    isSelected ? 'bg-red-50 text-red-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isFromHistory ? (
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="truncate">{suggestion}</span>
                  </div>

                  {isFromHistory && (
                    <span className="text-[11px] text-slate-400 font-normal">سجل سابق</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
            <span>اقتراحات بحث مصرية حية</span>
            <span className="flex items-center gap-1 text-[11px]">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono">↓↑</kbd>
              <span>للتنقل</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono mr-1">Enter</kbd>
              <span>للبحث</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
