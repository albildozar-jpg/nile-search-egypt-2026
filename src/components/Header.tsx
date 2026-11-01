import React from 'react';
import { NileLogo } from './NileLogo';
import { TrendingUp, Settings, History, Info } from 'lucide-react';

interface HeaderProps {
  variant?: 'home' | 'compact';
  onOpenWidgets: () => void;
  onOpenHistory: () => void;
  onOpenAbout: () => void;
  onOpenFounder?: () => void;
  onOpenProviders: () => void;
  onNavigateHome: () => void;
  onSelectCategory?: (categoryQuery: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'compact',
  onOpenWidgets,
  onOpenHistory,
  onOpenAbout,
  onOpenFounder,
  onOpenProviders,
  onNavigateHome,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1 transition-transform hover:scale-102"
            title="الصفحة الرئيسية لمحرك نايل"
          >
            <NileLogo size="sm" showSubtitle={false} />
            {variant === 'compact' && (
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 border-r border-slate-200 pr-2 mr-1">
                البحث المصري
              </span>
            )}
          </button>
        </div>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectCategory?.('أخبار مصر اليوم')}
            className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            الأخبار المصرية
          </button>
          <button
            onClick={() => onSelectCategory?.('بوابة مصر الرقمية للخدمات الحكومية')}
            className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            الخدمات الحكومية
          </button>
          <button
            onClick={() => onSelectCategory?.('السياحة في الأقصر وأسوان')}
            className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            السياحة والآثار
          </button>
          <button
            onClick={onOpenWidgets}
            className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>أسعار الذهب والعملات</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>عن نايل</span>
          </button>
          {onOpenFounder && (
            <button
              onClick={onOpenFounder}
              className="hover:text-red-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium text-slate-600"
            >
              عن المؤسس
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action & utility triggers */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenHistory}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="سجل البحث"
            aria-label="سجل البحث"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenProviders}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="إعدادات ومزودو البحث"
            aria-label="إعدادات البحث"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenWidgets}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] rounded-lg transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300"></span>
            <span>نبض مصر</span>
          </button>
        </div>
      </div>
    </header>
  );
};
