import React from 'react';
import { SearchResult } from '../types/search';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  let hostname = result.displayUrl;
  try {
    hostname = new URL(result.url).hostname;
  } catch {
    // Keep displayUrl
  }

  return (
    <article className="group py-4 sm:py-5 border-b border-slate-100 last:border-b-0 transition-colors">
      <div className="flex flex-col gap-1.5">
        {/* Source URL & Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            {/* Favicon or icon */}
            <div className="w-4 h-4 rounded-sm bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
                alt=""
                className="w-3.5 h-3.5 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="truncate max-w-[200px]">{result.source}</span>
          </div>

          <span aria-hidden="true" className="text-slate-300">·</span>

          <span className="text-slate-400 truncate max-w-[280px] font-mono text-[11px]" dir="ltr">
            {result.displayUrl}
          </span>

          {result.isEgyptianOfficial && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>موقع مصري رسمي معتمد</span>
              </span>
            </>
          )}

          {result.date && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400">{result.date}</span>
            </>
          )}
        </div>

        {/* Title Link */}
        <h3 className="text-lg sm:text-xl font-bold leading-snug">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a0dab] hover:text-[#C8102E] hover:underline transition-colors inline-flex items-baseline gap-1"
          >
            <span>{result.title}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0 self-center" />
          </a>
        </h3>

        {/* Snippet + Optional Thumbnail */}
        <div className="flex gap-4 items-start mt-0.5">
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              {result.snippet}
            </p>
          </div>

          {result.thumbnail && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img
                src={result.thumbnail}
                alt={result.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  (e.target as HTMLElement).parentElement!.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Deep Links / Sitelinks if present */}
        {result.deepLinks && result.deepLinks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
            {result.deepLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-red-50/50 hover:border-red-200 border border-slate-200/70 transition-all text-right group/link"
              >
                <div className="text-xs sm:text-sm font-semibold text-[#1a0dab] group-hover/link:text-red-700 group-hover/link:underline">
                  {link.title}
                </div>
                {link.snippet && (
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {link.snippet}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
