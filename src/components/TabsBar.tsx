import React from 'react';
import { SearchTab } from '../types/search';
import { Globe, Newspaper, Building2, Image as ImageIcon, Video } from 'lucide-react';

interface TabsBarProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  resultCount?: number;
}

export const TabsBar: React.FC<TabsBarProps> = ({
  activeTab,
  onTabChange,
  resultCount,
}) => {
  const tabs: { id: SearchTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'الكل', icon: <Globe className="w-4 h-4" /> },
    { id: 'news', label: 'الأخبار المصرية', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'gov', label: 'الخدمات الحكومية', icon: <Building2 className="w-4 h-4" /> },
    { id: 'images', label: 'الصور', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'videos', label: 'الفيديو', icon: <Video className="w-4 h-4" /> },
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 sm:gap-2 py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#C8102E] text-[#C8102E] font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {typeof resultCount === 'number' && (
          <div className="hidden lg:flex items-center text-xs text-slate-500 whitespace-nowrap">
            <span>تم العثور على {resultCount} نتيجة موثقة</span>
          </div>
        )}
      </div>
    </div>
  );
};
