import { EgyptianWidgetsData } from '../types/search.js';

export function getEgyptianWidgets(): EgyptianWidgetsData {
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    updatedAt: `اليوم، ${timeFormatted} بتوقيت القاهرة`,
    currencies: {
      base: 'EGP',
      items: [
        { code: 'USD', nameAr: 'دولار أمريكي', buy: 48.95, sell: 49.05, change: '+0.05%' },
        { code: 'EUR', nameAr: 'يورو أوروبي', buy: 53.12, sell: 53.35, change: '-0.12%' },
        { code: 'SAR', nameAr: 'ريال سعودي', buy: 13.04, sell: 13.09, change: '0.00%' },
        { code: 'AED', nameAr: 'درهم إماراتي', buy: 13.32, sell: 13.36, change: '+0.02%' },
        { code: 'KWD', nameAr: 'دينار كويتي', buy: 159.20, sell: 160.15, change: '+0.15%' },
        { code: 'GBP', nameAr: 'جنيه إسترليني', buy: 62.40, sell: 62.75, change: '+0.08%' },
      ],
    },
    gold: {
      unit: 'جنيه مصري / جرام',
      items: [
        { karat: '24', nameAr: 'ذهب عيار 24 (نقي)', price: 4285, change: '+15 ج.م' },
        { karat: '21', nameAr: 'ذهب عيار 21 (الأكثر تداولاً)', price: 3750, change: '+12 ج.م' },
        { karat: '18', nameAr: 'ذهب عيار 18', price: 3214, change: '+10 ج.م' },
        { karat: 'pound', nameAr: 'الجنيه الذهب (8 جرام عيار 21)', price: 30000, change: '+100 ج.م' },
      ],
    },
    weather: {
      city: 'القاهرة',
      temp: 24,
      conditionAr: 'معتدل ومشمس',
      high: 27,
      low: 17,
      humidity: 52,
    },
    prayerTimes: {
      city: 'القاهرة وضواحيها',
      fajr: '04:46',
      sunrise: '06:14',
      dhuhr: '11:41',
      asr: '14:48',
      maghrib: '17:08',
      isha: '18:27',
    },
  };
}
