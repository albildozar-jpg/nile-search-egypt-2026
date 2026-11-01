import React, { useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { NileLogo } from './NileLogo';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative text-right flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Subtle Egyptian Flag Top Stripe */}
        <div className="h-1.5 w-full flex">
          <div className="w-1/3 bg-[#C8102E]"></div>
          <div className="w-1/3 bg-white border-y border-slate-200"></div>
          <div className="w-1/3 bg-[#0B0F19]"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 left-3.5 p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="إغلاق"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-4">
            <NileLogo size="md" showSubtitle={false} />
          </div>

          {/* Heading */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <span>نايل</span>
            <span className="text-base">🇪🇬</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>محرك بحث مصري وعربي</span>
          </div>

          {/* Egyptian Handcrafted Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-bold text-[#C8102E] mb-6 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#C8102E]" />
            <span>صُنع بيد مصرية</span>
          </div>

          {/* Founder Section */}
          <div className="w-full py-5 px-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 mb-5 relative overflow-hidden">
            {/* Subtle Egyptian corner ribbon accent */}
            <div className="text-xs font-semibold text-slate-500 mb-1">
              المؤسس
            </div>

            {/* Prominent Founder Name with Egyptian Elegance */}
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Cairo'] relative inline-block my-1">
              <span className="bg-gradient-to-r from-[#0B0F19] via-[#C8102E] to-[#0B0F19] bg-clip-text text-transparent">
                محمد حسن قنديل
              </span>
            </h3>

            {/* Golden Eagle / Flag underline touch */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-8 h-0.5 bg-[#C8102E] rounded-full"></div>
              <div className="w-3 h-0.5 bg-[#C69214] rounded-full"></div>
              <div className="w-8 h-0.5 bg-[#0B0F19] rounded-full"></div>
            </div>
          </div>

          {/* Inspirational Tagline */}
          <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed max-w-xs">
            «من مصر، نحلم ونبني للمستقبل.»
          </p>

          <p className="text-xs text-slate-400 mt-2">
            رؤية وطنية لتقنية بحث عربية مستقلة وسريعة
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>جمهورية مصر العربية</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
