import React from 'react';
import { SearchResult } from '../types/search';
import { Video, ExternalLink, Play } from 'lucide-react';

interface VideoResultsListProps {
  results: SearchResult[];
}

export const VideoResultsList: React.FC<VideoResultsListProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        <Video className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p className="text-base font-medium">لم يتم العثور على فيديوهات لهذا الاستعلام.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 max-w-3xl">
      {results.map((video) => (
        <a
          key={video.id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-4 items-start transition-all hover:shadow-sm"
        >
          <div className="relative w-full sm:w-48 h-32 bg-slate-900 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <Video className="w-10 h-10 text-white/50" />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white translate-x-[-1px]" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-red-600">{video.source}</span>
                <span aria-hidden="true">·</span>
                <span>فيديو ويب يوتيوب</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                {video.snippet}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#1a0dab] group-hover:underline mt-3">
              <span>مشاهدة الفيديو على {video.source}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
