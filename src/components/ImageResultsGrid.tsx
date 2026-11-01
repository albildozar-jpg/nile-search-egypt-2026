import React, { useState } from 'react';
import { SearchResult } from '../types/search';
import { ExternalLink, X, Image as ImageIcon } from 'lucide-react';

interface ImageResultsGridProps {
  results: SearchResult[];
}

export const ImageResultsGrid: React.FC<ImageResultsGridProps> = ({ results }) => {
  const [selectedImage, setSelectedImage] = useState<SearchResult | null>(null);

  if (results.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p className="text-base font-medium">لم يتم العثور على صور لهذا الاستعلام في الوقت الحالي.</p>
        <p className="text-xs text-slate-400 mt-1">جرّب البحث بكلمات عامة أو التحقق من تبويب «الكل».</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 py-4">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer aspect-square hover:shadow-md transition-all"
          >
            <img
              src={item.thumbnail || item.url}
              alt={item.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                (e.target as HTMLElement).parentElement!.style.display = 'none';
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end text-white text-right">
              <span className="text-xs font-semibold line-clamp-2 leading-tight">{item.title}</span>
              <span className="text-[10px] text-slate-300 truncate mt-1">{item.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-right flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-sm font-bold text-slate-900 truncate max-w-[80%]">
                {selectedImage.title}
              </div>
            </div>

            <div className="bg-slate-950 flex items-center justify-center flex-1 min-h-[300px] max-h-[60vh] overflow-hidden p-2">
              <img
                src={selectedImage.thumbnail || selectedImage.url}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[55vh] max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>المصدر: {selectedImage.source}</span>
                {selectedImage.imageDimensions && (
                  <span className="mr-2 font-mono">
                    ({selectedImage.imageDimensions.width} × {selectedImage.imageDimensions.height})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>زيارة صفحة المصدر</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
