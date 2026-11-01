export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCx = process.env.GOOGLE_SEARCH_CX;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const payload = {
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
  };

  if (typeof res.json === 'function') {
    res.json(payload);
  } else {
    res.end(JSON.stringify(payload));
  }
}
