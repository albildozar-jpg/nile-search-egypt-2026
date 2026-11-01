import React from 'react';
import { X, Sparkles, Shield, HeartHandshake, Award } from 'lucide-react';
import { NileLogo } from './NileLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
        {/* Hero image with Cairo skyline and Nile */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
          <img
            src="/src/assets/images/nile_cairo_skyline_1793526380049.jpg"
            alt="نهر النيل والقاهرة"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#C8102E] text-white px-2.5 py-0.5 rounded-full font-semibold">
                مشروع مصري وطني 🇪🇬
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 font-['Cairo']">
              عن محرك بحث «نايل»
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              محرك البحث العربي المصري – بوابتك الذكية للويب والمعرفة الموثقة
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1.5 text-white bg-black/50 hover:bg-black/80 rounded-lg transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-700 leading-relaxed text-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">الرؤية والهدف</h3>
            <p>
              مشروع <strong>«نايل» (Nile Egyptian Search)</strong> وُلد لتقديم تجربة بحث متطورة، سريعة،
              ومصممة خصيصاً للمستخدم المصري والعربي. نهدف إلى سد الفجوة الرقمية من خلال إعطاء أولوية
              فعلية للمؤسسات المصرية الرسمية، والمواقع الإخبارية الموثقة، ومصادر الخدمات الحكومية،
              والتراث السياحي والحضاري دون وساطة خوارزميات غير ملائمة للبيئة المحلية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>نتائج حقيقية 100%</span>
              </div>
              <p className="text-xs text-slate-600">
                لا نختلق روابط أو نتائج أو أخبار. كل نتيجة معروضة هي رابط فعلي من مصادر الويب المعتمدة.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Award className="w-4 h-4 text-red-600" />
                <span>أولوية للمصادر المصرية</span>
              </div>
              <p className="text-xs text-slate-600">
                فهرسة وترتيب يراعي النطاقات الرسمية مثل <span className="font-mono">.gov.eg</span> والوزارات والبنوك.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>سرعة وبساطة فائقة</span>
              </div>
              <p className="text-xs text-slate-600">
                واجهة عربية خالية من الإعلانات المزعجة أو التتبع، متوافقة تماماً مع الهواتف الذكية وأجهزة الحاسوب.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                <span>مجاني ومفتوح للمواطنين</span>
              </div>
              <p className="text-xs text-slate-600">
                يعتمد بالكامل على مسارات مفتوحة وبدائل مجانية قانونية تضمن استدامة الخدمة لجميع المستخدمين.
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
            <span>جمهورية مصر العربية 🇪🇬</span>
            <span>إصدار نايل 1.0 المستقر</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            فهمت، شكراً لك
          </button>
        </div>
      </div>
    </div>
  );
};
