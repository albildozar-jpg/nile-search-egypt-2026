import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, Key, ExternalLink, HelpCircle, Layers } from 'lucide-react';

interface ProvidersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProviderInfo {
  name: string;
  type: string;
  status: string;
  description: string;
}

export const ProvidersModal: React.FC<ProvidersModalProps> = ({ isOpen, onClose }) => {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/providers')
        .then((res) => res.json())
        .then((data) => setProviders(data.providers || []))
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                مزودو نتائج البحث والشفافية التقنية
              </h2>
              <p className="text-xs text-slate-500">
                بنية تحتية قانونية متعددة المصادر بدون نتائج وهمية
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Transparency Statement */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-xs text-emerald-900 leading-relaxed">
              <p className="font-bold text-sm mb-0.5">سياسة نايل الصارمة: نتائج ويب حقيقية فقط</p>
              <p>
                لا يقوم نايل بتوليد أو اختلاق أي روابط أو نتائج وهمية على الإطلاق. يعتمد المحرك على
                مصادر ويب فعلية وتغذيات إخبارية مصرية فورية وموسوعات رسمية مجانية بالكامل.
              </p>
            </div>
          </div>

          {/* List of Search Providers */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              المصادر والمحركات المدمجة في نايل
            </h3>

            <div className="space-y-2.5">
              {providers.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white flex items-start justify-between gap-3"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    {p.status === 'active' || p.status === 'configured' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>نشط ويعمل</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        <span>خيار مجاني إضافي</span>
                      </span>
                    )}
                  </div>

                  <div className="flex-1 text-right">
                    <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guide to Google Custom Search Free Tier */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">
                100 عملية بحث مجانية يومياً
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Key className="w-4 h-4 text-amber-600" />
                <span>إعداد Google Custom Search API (اختياري تماماً ومجاني)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              محرك نايل يعمل الآن بالفعل بكفاءة كاملة عبر المصادر المدمجة أعلاه دون الحاجة لأي مفتاح.
              إذا أردت ربط فهرس Google الرسمي، توفر جوجل باقة مجانية تمنحك 100 استعلام يومياً مجاناً:
            </p>

            <ol className="text-xs text-slate-700 list-decimal list-inside space-y-1.5 mt-2.5 font-medium">
              <li>
                قم بإنشاء مشروع في <span className="font-mono text-slate-900">Google Cloud Console</span> وتفعيل خدمة <span className="font-mono text-slate-900">Custom Search API</span>.
              </li>
              <li>
                احصل على مفتاح API وضعه في ملف <span className="font-mono bg-white px-1 border rounded text-red-600">.env</span> باسم <span className="font-mono">GOOGLE_SEARCH_API_KEY</span>.
              </li>
              <li>
                أنشئ محرك بحث في <span className="font-mono text-slate-900">Google Programmable Search</span> لجميع مواقع الويب، وانسخ معرف المحرك (Search Engine ID - CX) وضعه باسم <span className="font-mono">GOOGLE_SEARCH_CX</span>.
              </li>
            </ol>

            <p className="text-[11px] text-slate-500 mt-2">
              * لن يتم خصم أو طلب أي رسوم، والمحرك لا يطلب أي بطاقة بنكية.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            إغلاق
          </button>
          <span className="text-xs text-slate-500">
            نايل محرك بحث مصري ذو سيادة وشفافية كاملة
          </span>
        </div>
      </div>
    </div>
  );
};
