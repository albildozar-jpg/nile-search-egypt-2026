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
  const payload = {
    trending: [
      { label: 'أخبار مصر اليوم', category: 'الأخبار', query: 'أخبار مصر اليوم' },
      { label: 'وزارة الصحة المصرية', category: 'خدمات', query: 'وزارة الصحة المصرية' },
      { label: 'السياحة في الأقصر', category: 'سياحة', query: 'السياحة في الأقصر' },
      { label: 'النادي الأهلي المصري', category: 'رياضة', query: 'النادي الأهلي المصري' },
      { label: 'البنك المركزي المصري', category: 'اقتصاد', query: 'البنك المركزي المصري' },
      { label: 'أسعار الذهب عيار 21', category: 'أسواق', query: 'سعر الذهب اليوم عيار 21 في مصر' },
      { label: 'بوابة مصر الرقمية', category: 'حكومة', query: 'بوابة مصر الرقمية' },
    ],
  };

  if (typeof res.json === 'function') {
    res.json(payload);
  } else {
    res.end(JSON.stringify(payload));
  }
}
