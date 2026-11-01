import React, { useState, useEffect } from 'react';
import { EgyptianWidgetsData } from '../types/search';
import { X, TrendingUp, Coins, CloudSun, Clock, Calculator, RefreshCw } from 'lucide-react';

interface WidgetsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery: (q: string) => void;
}

export const WidgetsDrawer: React.FC<WidgetsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectQuery,
}) => {
  const [data, setData] = useState<EgyptianWidgetsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [usdInput, setUsdInput] = useState<string>('100');

  const fetchWidgets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/widgets');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWidgets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const usdRate = data?.currencies.items.find((c) => c.code === 'USD')?.buy || 48.95;
  const convertedEgp = (Number(usdInput) || 0) * usdRate;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Egyptian Accent */}
        <div className="relative p-5 border-b border-slate-100 bg-slate-900 text-white">
          <div className="absolute top-0 right-0 left-0 h-1 flex">
            <div className="w-1/3 bg-[#C8102E]"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-[#0B0F19]"></div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold">نبض مصر – مؤشرات وخدمات حية</span>
              <span className="text-xl">🇪🇬</span>
            </div>
          </div>
          {data?.updatedAt && (
            <p className="text-[11px] text-slate-400 mt-1 font-mono">{data.updatedAt}</p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Quick Currency Converter */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500">سعر الصرف البنكي</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>حاسبة الدولار للجنيه المصري</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">المبلغ بالدولار ($)</label>
                <input
                  type="number"
                  value={usdInput}
                  onChange={(e) => setUsdInput(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-red-500 text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">القيمة بالجنيه المصري</label>
                <div className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold font-mono text-emerald-700 text-left" dir="ltr">
                  {convertedEgp.toLocaleString('ar-EG', { maximumFractionDigits: 2 })} ج.م
                </div>
              </div>
            </div>
          </div>

          {/* Egyptian Pound Currencies Table */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <button
                onClick={() => {
                  onClose();
                  onSelectQuery('سعر الدولار اليوم في مصر');
                }}
                className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
              >
                بحث عن أسعار العملات ←
              </button>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>أسعار العملات مقابل الجنيه المصري</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-xs">
              {data?.currencies.items.map((item) => (
                <div key={item.code} className="px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="font-mono text-slate-500 text-left flex items-center gap-2" dir="ltr">
                    <span className="font-bold text-slate-900">{item.buy.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400">شراء</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{item.nameAr}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Egyptian Gold Market */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <button
                onClick={() => {
                  onClose();
                  onSelectQuery('سعر الذهب اليوم في مصر عيار 21');
                }}
                className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
              >
                بحث عن أسعار الذهب ←
              </button>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>أسعار الذهب في الصاغة المصرية</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {data?.gold.items.map((g) => (
                <div
                  key={g.karat}
                  className="p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-slate-800">{g.nameAr}</span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-emerald-600 font-mono">{g.change}</span>
                    <span className="text-sm font-black text-amber-900 font-mono">
                      {g.price.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prayer Times in Cairo */}
          {data?.prayerTimes && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs text-slate-400">الهيئة المصرية للمساحة</span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>مواقيت الصلاة في القاهرة</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">الفجر</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.fajr}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">الشروق</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.sunrise}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">الظهر</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.dhuhr}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">العصر</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.asr}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">المغرب</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.maghrib}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">العشاء</span>
                  <span className="font-mono font-bold text-slate-900">{data.prayerTimes.isha}</span>
                </div>
              </div>
            </div>
          )}

          {/* Cairo Weather */}
          {data?.weather && (
            <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-2xl flex items-center justify-between">
              <div className="text-left font-mono" dir="ltr">
                <span className="text-2xl font-bold text-sky-950">{data.weather.temp}°C</span>
                <span className="text-xs text-sky-700 block">العظمى {data.weather.high}° / الصغرى {data.weather.low}°</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 block">طقس {data.weather.city}</span>
                  <span className="text-xs text-slate-600">{data.weather.conditionAr}</span>
                </div>
                <CloudSun className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={fetchWidgets}
            disabled={loading}
            className="flex items-center gap-1.5 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-600' : ''}`} />
            <span>تحديث البيانات</span>
          </button>
          <span>بيانات مؤشرات السوق المصري</span>
        </div>
      </div>
    </div>
  );
};
