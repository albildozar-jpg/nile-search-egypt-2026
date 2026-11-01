import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeSearch } from './src/server/searchEngine.js';
import { getEgyptianWidgets } from './src/server/widgetData.js';
import { SearchTab } from './src/types/search.js';
import { normalizeArabic } from './src/server/officialEgyptianDirectory.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const POPULAR_EGYPTIAN_QUERIES = [
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

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Route: Real Web Search
  app.get('/api/search', async (req, res) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : '';
      const type = (typeof req.query.type === 'string' ? req.query.type : 'all') as SearchTab;
      const page = Number(req.query.page) || 1;

      const response = await executeSearch(q, type, page);
      res.json(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
      console.error('Error in /api/search:', errorMessage);
      res.status(500).json({
        error: 'Search error',
        message: 'حدث خطأ أثناء الاتصال بمزود البحث. يرجى المحاولة مرة أخرى.',
      });
    }
  });

  // API Route: Live Arabic Auto-Suggestions
  app.get('/api/suggest', async (req, res) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
      if (!q) {
        return res.json({ suggestions: POPULAR_EGYPTIAN_QUERIES.slice(0, 6) });
      }

      // 1. First check matching popular Egyptian queries
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
          // Chrome suggest returns: [query, [suggestions], ...]
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
  });

  // API Route: Trending Egyptian Searches
  app.get('/api/trending', (_req, res) => {
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
  });

  // API Route: Egyptian Live Financial & Utility Widgets
  app.get('/api/widgets', (_req, res) => {
    res.json(getEgyptianWidgets());
  });

  // API Route: Search Providers Status
  app.get('/api/providers', (_req, res) => {
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
  });

  // Vite Integration: Development vs Production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[نايل Nile Search] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Nile Search Server:', err);
  process.exit(1);
});
