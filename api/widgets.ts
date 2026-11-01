import { getEgyptianWidgets } from '../src/server/widgetData.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const payload = getEgyptianWidgets();
  if (typeof res.json === 'function') {
    res.json(payload);
  } else {
    res.end(JSON.stringify(payload));
  }
}
