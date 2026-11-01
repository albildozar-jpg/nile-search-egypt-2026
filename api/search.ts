import { executeSearch } from '../src/server/searchEngine.js';
import { SearchTab } from '../src/types/search.js';

export default async function handler(req: any, res: any) {
  // CORS & Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    // Robustly extract query params whether running on Vercel or Node
    let q = '';
    let type: SearchTab = 'all';
    let page = 1;

    if (req.query && typeof req.query === 'object') {
      if (typeof req.query.q === 'string') q = req.query.q;
      if (typeof req.query.type === 'string') type = req.query.type as SearchTab;
      if (req.query.page) page = Number(req.query.page) || 1;
    }

    // Fallback: parse from req.url if not in req.query
    if (!q && req.url) {
      try {
        const parsedUrl = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
        q = parsedUrl.searchParams.get('q') || '';
        const parsedType = parsedUrl.searchParams.get('type');
        if (parsedType) type = parsedType as SearchTab;
        const parsedPage = parsedUrl.searchParams.get('page');
        if (parsedPage) page = Number(parsedPage) || 1;
      } catch {
        // Ignore URL parsing errors
      }
    }

    const response = await executeSearch(q, type, page);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (typeof res.json === 'function') {
      res.json(response);
    } else {
      res.end(JSON.stringify(response));
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown search error';
    console.error('Vercel Search Handler Error:', errorMsg);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const errPayload = {
      error: 'Search error',
      message: 'حدث خطأ أثناء الاتصال بمزود البحث. يرجى المحاولة مرة أخرى.',
    };
    if (typeof res.json === 'function') {
      res.json(errPayload);
    } else {
      res.end(JSON.stringify(errPayload));
    }
  }
}
