import React from 'react';
import { OfficialEntity, KnowledgeCard } from '../types/search';
import { ExternalLink, Phone, MapPin, CheckCircle, ShieldCheck, Globe } from 'lucide-react';

interface KnowledgePanelProps {
  officialEntity?: OfficialEntity | null;
  knowledgeCard?: KnowledgeCard | null;
}

export const KnowledgePanel: React.FC<KnowledgePanelProps> = ({
  officialEntity,
  knowledgeCard,
}) => {
  if (!officialEntity && !knowledgeCard) return null;

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col gap-4">
      {/* 1. Official Egyptian Entity Verified Box */}
      {officialEntity && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-right relative overflow-hidden">
          {/* Subtle top Egyptian flag ribbon */}
          <div className="absolute top-0 right-0 left-0 h-1.5 flex">
            <div className="w-1/3 bg-[#C8102E]"></div>
            <div className="w-1/3 bg-white border-y border-slate-200"></div>
            <div className="w-1/3 bg-[#0B0F19]"></div>
          </div>

          <div className="flex items-start justify-between gap-3 mt-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{officialEntity.categoryLabel}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {officialEntity.arabicName}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5" dir="ltr">
                {officialEntity.name}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
            {officialEntity.description}
          </p>

          {/* Quick Contact & Address Information */}
          <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
            {officialEntity.phone && (
              <div className="flex items-center gap-2 text-slate-800 font-medium">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>{officialEntity.phone}</span>
              </div>
            )}
            {officialEntity.address && (
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{officialEntity.address}</span>
              </div>
            )}
          </div>

          {/* Direct Official Portal CTA Button */}
          <div className="mt-4">
            <a
              href={officialEntity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#0B0F19] hover:bg-[#C8102E] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>زيارة البوابة الرسمية المعتمدة</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Sublinks shortcuts */}
          {officialEntity.subLinks.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                روابط وخدمات سريعة:
              </span>
              <div className="flex flex-col gap-1.5">
                {officialEntity.subLinks.slice(0, 4).map((sub, idx) => (
                  <a
                    key={idx}
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1a0dab] hover:text-[#C8102E] hover:underline flex items-center justify-between group/sub py-1"
                  >
                    <span className="truncate">{sub.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover/sub:text-[#C8102E] shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Wikipedia or General Knowledge Card (if not redundant) */}
      {knowledgeCard && (!officialEntity || knowledgeCard.title !== officialEntity.arabicName) && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
          {knowledgeCard.imageUrl && (
            <div className="w-full h-44 bg-slate-100 overflow-hidden relative border-b border-slate-100">
              <img
                src={knowledgeCard.imageUrl}
                alt={knowledgeCard.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).parentElement!.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <span>بطاقة معلومات</span>
              <span aria-hidden="true">·</span>
              <span>{knowledgeCard.sourceName}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {knowledgeCard.title}
            </h3>

            {knowledgeCard.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{knowledgeCard.subtitle}</p>
            )}

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
              {knowledgeCard.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <a
                href={knowledgeCard.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#1a0dab] hover:text-[#C8102E] hover:underline flex items-center gap-1"
              >
                <span>المزيد على {knowledgeCard.sourceName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
