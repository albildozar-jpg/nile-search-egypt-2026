import searchHandler from './search.js';
import suggestHandler from './suggest.js';
import trendingHandler from './trending.js';
import widgetsHandler from './widgets.js';
import providersHandler from './providers.js';

export default async function handler(req: any, res: any) {
  let pathname = '';
  try {
    const url = new URL(req.url || '', `http://${req.headers?.host || 'localhost'}`);
    pathname = url.pathname;
  } catch {
    pathname = req.url || '';
  }

  if (pathname.includes('/search')) {
    return searchHandler(req, res);
  }
  if (pathname.includes('/suggest')) {
    return suggestHandler(req, res);
  }
  if (pathname.includes('/trending')) {
    return trendingHandler(req, res);
  }
  if (pathname.includes('/widgets')) {
    return widgetsHandler(req, res);
  }
  if (pathname.includes('/providers')) {
    return providersHandler(req, res);
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const payload = {
    status: 'online',
    engine: 'Nile Egyptian Search Serverless Engine 🇪🇬',
    version: '1.0.0',
    endpoints: ['/api/search', '/api/suggest', '/api/trending', '/api/widgets', '/api/providers'],
  };
  if (typeof res.json === 'function') {
    res.json(payload);
  } else {
    res.end(JSON.stringify(payload));
  }
}
