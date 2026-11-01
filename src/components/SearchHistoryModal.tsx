import React from 'react';
import { HistoryItem } from '../hooks/useSearchHistory';
import { X, History, Trash2, Search, ArrowLeft } from 'lucide-react';

interface SearchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectQuery: (query: string) => void;
  onRemoveQuery: (query: string) => void;
  onClearAll: () => void;
}

export const SearchHistoryModal: React.FC<SearchHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectQuery,
  onRemoveQuery,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900">سجل عمليات البحث</span>
            <History className="w-5 h-5 text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <History className="w-10 h-10 mx-auto text-slate-300 mb-2.5" />
              <p className="text-sm font-medium">سجل البحث فارغ حالياً.</p>
              <p className="text-xs text-slate-400 mt-1">
                تُحفظ عمليات البحث على جهازك محلياً لخصوصية تامة.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleDateString('ar-EG', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={`${item.query}-${item.timestamp}`}
                  className="py-3 flex items-center justify-between group hover:bg-slate-50 px-2 rounded-xl transition-colors"
                >
                  <button
                    onClick={() => onRemoveQuery(item.query)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="حذف من السجل"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectQuery(item.query);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-end gap-3 text-right cursor-pointer"
                  >
                    <span className="text-[11px] text-slate-400 font-mono">{formattedDate}</span>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-red-700 transition-colors">
                      {item.query}
                    </span>
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح كل السجل</span>
            </button>
            <span className="text-xs text-slate-500">
              {history.length} عمليات بحث محفوظة محلياً
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
