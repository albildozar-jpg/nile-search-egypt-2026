import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, HardDrive } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-right"
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
                سياسة الخصوصية وحماية بياناتك
              </h2>
              <p className="text-xs text-slate-500">
                خصوصيتك حق أصيل – نايل لا يتتبعك
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 mb-0.5">عدم تتبع الهوية الشخصية</h3>
              <p className="text-xs text-slate-600">
                لا نقوم بإنشاء ملفات تعريف شخصية (Profiling) لاهتماماتك ولا نربط استعلاماتك بعنوان IP أو بيانات جهازك.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 mb-0.5">سجل البحث محفوظ على جهازك فقط</h3>
              <p className="text-xs text-slate-600">
                سجل عمليات البحث الذي تراه في التطبيق يُخزن محلياً داخل متصفحك (LocalStorage) ولا يُرسل أو يُخزن على أي خوادم خارجية. يمكنك مسحه بضغطة زر في أي وقت.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 mb-0.5">لا بيع للبيانات أو إعلانات موجهة</h3>
              <p className="text-xs text-slate-600">
                لا نشارك استعلاماتك مع أي معلنين أو أطراف ثالثة لأغراض تجارية.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
