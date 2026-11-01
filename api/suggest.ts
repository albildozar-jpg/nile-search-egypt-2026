import { normalizeArabic } from '../src/server/officialEgyptianDirectory.js';

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

export default async function handler(req: any, res: any) {
  // CORS & Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    let rawQ = '';
    if (req.query && typeof req.query.q === 'string') {
      rawQ = req.query.q;
    } else if (req.url) {
      try {
        const parsedUrl = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
        rawQ = parsedUrl.searchParams.get('q') || '';
      } catch {
        // Ignore
      }
    }

    const q = rawQ.trim();

    if (!q) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      const payload = { suggestions: POPULAR_EGYPTIAN_QUERIES.slice(0, 6) };
      if (typeof res.json === 'function') {
        res.json(payload);
      } else {
        res.end(JSON.stringify(payload));
      }
      return;
    }

    // 1. Check matching popular Egyptian queries
    const normQuery = normalizeArabic(q.toLowerCase());
    const localMatches = POPULAR_EGYPTIAN_QUERIES.filter((item) =>
      normalizeArabic(item.toLowerCase()).includes(normQuery)
    );

    // 2. Query Google Suggest Arabic API for real-time autocomplete
    let finalSuggestions = localMatches;
    try {
      const suggestUrl = `https://suggestqueries.google.com/complete/search?client=chrome&hl=ar&gl=eg&q=${encodeURIComponent(
        q
      )}`;
      const suggestRes = await fetch(suggestUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(2000),
      });

      if (suggestRes.ok) {
        const data = await suggestRes.json();
        const remoteSuggestions: string[] = Array.isArray(data[1]) ? data[1] : [];
        finalSuggestions = Array.from(new Set([...localMatches, ...remoteSuggestions])).slice(0, 8);
      }
    } catch {
      // Fall through to localMatches
    }

    if (finalSuggestions.length === 0) {
      finalSuggestions = [q];
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const resultPayload = { suggestions: finalSuggestions.slice(0, 8) };
    if (typeof res.json === 'function') {
      res.json(resultPayload);
    } else {
      res.end(JSON.stringify(resultPayload));
    }
  } catch (err) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const emptyPayload = { suggestions: POPULAR_EGYPTIAN_QUERIES.slice(0, 6) };
    if (typeof res.json === 'function') {
      res.json(emptyPayload);
    } else {
      res.end(JSON.stringify(emptyPayload));
    }
  }
}
