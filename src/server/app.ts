import express from 'express';
import dotenv from 'dotenv';
import { executeSearch } from './searchEngine.js';
import { getEgyptianWidgets } from './widgetData.js';
import { SearchTab } from '../types/search.js';
import { normalizeArabic } from './officialEgyptianDirectory.js';

dotenv.config();

export const POPULAR_EGYPTIAN_QUERIES = [
  'وزارة الصحة المصرية',
  'أخبار مصر اليوم',
  'السياحة في الأقصر',
  'النادي الأهلي المصري',
  'البنك المركزي المصري',
  'سعر الدولار اليوم في البنوك المصرية',
  'سعر الذهب اليوم عيار 21 في مصر',
  'بوابة مصر الرقمية للخدمات الحكومية',
  'مواعيد مباريات الدوري المصري',
  'تنسيق الثانوية العامة والجامعات',
  'حجز شقق الإسكان الاجتماعي',
  'درجات الحرارة اليوم في محافظات مصر',
  'موقع وزارة التربية والتعليم',
  'رابط بطاقة التموين وخدمات التوثيق',
  'رحلات قطارات سكك حديد مصر',
];

export function createSearchApp() {
  const app = express();

  app.use(express.json());

  // CORS and Cache Control Middleware
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });

  // Handler: Real Web Search
  const handleSearch = async (req: express.Request, res: express.Response) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : '';
      const type = (typeof req.query.type === 'string' ? req.query.type : 'all') as SearchTab;
      const page = Number(req.query.page) || 1;

      const response = await executeSearch(q, type, page);
      res.json(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
      console.error('Error in search handler:', errorMessage);
      res.status(500).json({
        error: 'Search error',
        message: 'حدث خطأ أثناء الاتصال بمزود البحث. يرجى المحاولة مرة أخرى.',
      });
    }
  };

  // Handler: Live Arabic Auto-Suggestions
  const handleSuggest = async (req: express.Request, res: express.Response) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
      if (!q) {
        return res.json({ suggestions: POPULAR_EGYPTIAN_QUERIES.slice(0, 6) });
      }

      // 1. Check matching popular Egyptian queries
      const normQuery = normalizeArabic(q.toLowerCase());
      const localMatches = POPULAR_EGYPTIAN_QUERIES.filter((item) =>
        normalizeArabic(item.toLowerCase()).includes(normQuery)
      );

      // 2. Query Google Suggest Arabic API for real-time autocomplete
      try {
        const suggestUrl = `https://suggestqueries.google.com/complete/search?client=chrome&hl=ar&gl=eg&q=${encodeURIComponent(
          q
        )}`;
        const suggestRes = await fetch(suggestUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          signal: AbortSignal.timeout(2500),
        });

        if (suggestRes.ok) {
          const data = await suggestRes.json();
          const remoteSuggestions: string[] = Array.isArray(data[1]) ? data[1] : [];
          const combined = Array.from(new Set([...localMatches, ...remoteSuggestions])).slice(0, 8);
          return res.json({ suggestions: combined });
        }
      } catch {
        // Fall back to local matches
      }

      const fallback = localMatches.length > 0 ? localMatches : [q];
      res.json({ suggestions: fallback.slice(0, 6) });
    } catch (err) {
      res.json({ suggestions: [] });
    }
  };

  // Handler: Trending Egyptian Searches
  const handleTrending = (_req: express.Request, res: express.Response) => {
    res.json({
      trending: [
        { label: 'أخبار مصر اليوم', category: 'الأخبار', query: 'أخبار مصر اليوم' },
        { label: 'وزارة الصحة المصرية', category: 'خدمات', query: 'وزارة الصحة المصرية' },
        { label: 'السياحة في الأقصر', category: 'سياحة', query: 'السياحة في الأقصر' },
        { label: 'النادي الأهلي المصري', category: 'رياضة', query: 'النادي الأهلي المصري' },
        { label: 'البنك المركزي المصري', category: 'اقتصاد', query: 'البنك المركزي المصري' },
        { label: 'أسعار الذهب عيار 21', category: 'أسواق', query: 'سعر الذهب اليوم عيار 21 في مصر' },
        { label: 'بوابة مصر الرقمية', category: 'حكومة', query: 'بوابة مصر الرقمية' },
      ],
    });
  };

  // Handler: Egyptian Live Financial & Utility Widgets
  const handleWidgets = (_req: express.Request, res: express.Response) => {
    res.json(getEgyptianWidgets());
  };

  // Handler: Search Providers Status
  const handleProviders = (_req: express.Request, res: express.Response) => {
    const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const googleCx = process.env.GOOGLE_SEARCH_CX;

    res.json({
      providers: [
        {
          name: 'سجل الجهات الرسمية المصرية 🇪🇬',
          type: 'verified_directory',
          status: 'active',
          description: 'فهرس معتمد يضم بوابات الوزارات والبنك المركزي والأندية الرياضية والآثار المصرية بروابطها المباشرة.',
        },
        {
          name: 'Google News Egypt RSS (موجز الأخبار المصرية)',
          type: 'live_news_feed',
          status: 'active',
          description: 'تغذية إخبارية مباشرة ولحظية لأبرز الصحف القومية والخاصة في مصر.',
        },
        {
          name: 'ويكيبيديا العربية (Wikipedia Arabic API)',
          type: 'encyclopedic_api',
          status: 'active',
          description: 'محرك موسوعي يقدم بطاقات المعرفة والصور الموثقة والمقالات التفصيلية مجاناً.',
        },
        {
          name: 'DuckDuckGo Web Index',
          type: 'web_index',
          status: 'active',
          description: 'فهرس بحث حر للويب بدون تتبع للخصوصية، مجاني بالكامل.',
        },
        {
          name: 'Google Custom Search API',
          type: 'commercial_optional',
          status: googleApiKey && googleCx ? 'configured' : 'optional_free_tier',
          description:
            googleApiKey && googleCx
              ? 'مفعل ويعمل بكفاءة عبر مفتاح API الخاص بك.'
              : 'اختياري: يمكنك إضافة GOOGLE_SEARCH_API_KEY و GOOGLE_SEARCH_CX في ملف .env للحصول على 100 استعلام مجاني يومياً من جوجل.',
        },
      ],
    });
  };

  // Register routes with both '/api/*' and '/*' to guarantee match under any Vercel rewrite configuration
  app.get('/api/search', handleSearch);
  app.get('/search', handleSearch);

  app.get('/api/suggest', handleSuggest);
  app.get('/suggest', handleSuggest);

  app.get('/api/trending', handleTrending);
  app.get('/trending', handleTrending);

  app.get('/api/widgets', handleWidgets);
  app.get('/widgets', handleWidgets);

  app.get('/api/providers', handleProviders);
  app.get('/providers', handleProviders);

  return app;
}

export const app = createSearchApp();
export default app;
