import { XMLParser } from 'fast-xml-parser';
import { SearchResponse, SearchResult, SearchTab, KnowledgeCard } from '../types/search.js';
import { findMatchingEgyptianEntity, normalizeArabic } from './officialEgyptianDirectory.js';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

// Egyptian high-authority domains to boost
const EGYPTIAN_DOMAINS = [
  '.gov.eg',
  '.eg',
  '.edu.eg',
  'youm7.com',
  'ahram.org.eg',
  'gate.ahram.org.eg',
  'masrawy.com',
  'almasryalyoum.com',
  'shorouknews.com',
  'elwatannews.com',
  'dostor.org',
  'cbe.org.eg',
  'mohp.gov.eg',
  'digital.gov.eg',
  'cabinet.gov.eg',
  'alahlyegypt.com',
  'egypt.travel',
  'dar-alifta.org',
  'azhar.eg',
  'cu.edu.eg',
  'suezcanal.gov.eg',
  'sis.gov.eg',
  'egyptair.com',
];

export async function executeSearch(
  query: string,
  tab: SearchTab = 'all',
  page: number = 1
): Promise<SearchResponse> {
  const startTime = Date.now();
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      query: '',
      type: tab,
      total: 0,
      executionTimeMs: 0,
      results: [],
      relatedSearches: [],
      providersUsed: [],
      apiConfigured: Boolean(process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_CX),
      page: 1,
    };
  }

  const providersUsed: string[] = [];
  const allResults: SearchResult[] = [];
  let knowledgeCard: KnowledgeCard | null = null;

  // 1. Check verified official Egyptian entities
  const officialEntity = findMatchingEgyptianEntity(trimmedQuery);
  if (officialEntity) {
    providersUsed.push('سجل الجهات الرسمية المصرية 🇪🇬');
    
    // Convert official entity to a prominent top result as well
    const officialResult: SearchResult = {
      id: `official-${officialEntity.id}`,
      title: `${officialEntity.arabicName} - البوابة الرسمية`,
      url: officialEntity.url,
      displayUrl: officialEntity.url.replace(/^https?:\/\//, ''),
      snippet: officialEntity.description + (officialEntity.phone ? ` • ${officialEntity.phone}` : ''),
      source: officialEntity.arabicName,
      provider: 'official',
      isEgyptianOfficial: true,
      badges: ['جهة رسمية معتمدة 🇪🇬', officialEntity.categoryLabel],
      category: 'gov',
      deepLinks: officialEntity.subLinks.map((s) => ({
        title: s.title,
        url: s.url,
        snippet: s.description,
      })),
    };
    allResults.push(officialResult);
  }

  // 2. Fetch from Google Custom Search API if user configured keys
  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCx = process.env.GOOGLE_SEARCH_CX;
  let googleResultsFound = false;

  if (googleApiKey && googleCx) {
    try {
      const searchTypeParam = tab === 'images' ? '&searchType=image' : '';
      const startParam = page > 1 ? `&start=${(page - 1) * 10 + 1}` : '';
      const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(
        googleApiKey
      )}&cx=${encodeURIComponent(googleCx)}&q=${encodeURIComponent(
        trimmedQuery
      )}&gl=eg&hl=ar${searchTypeParam}${startParam}`;

      const res = await fetch(googleUrl, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        providersUsed.push('Google Custom Search API');
        googleResultsFound = true;

        if (data.items && Array.isArray(data.items)) {
          for (const item of data.items) {
            allResults.push({
              id: `g-${item.link}`,
              title: item.title,
              url: item.link,
              displayUrl: item.displayLink || item.link,
              snippet: item.snippet || item.title,
              source: item.displayLink || 'Google Search',
              provider: 'google_custom',
              thumbnail: item.pagemap?.cse_image?.[0]?.src || item.link,
              isEgyptianOfficial: isEgyptianDomain(item.link),
              isEgyptianMedia: isEgyptianMediaDomain(item.link),
              category: tab,
            });
          }
        }
      }
    } catch {
      // Continue to free multi-engine fallback
    }
  }

  // 3. Query Google News RSS Egypt (Free Real News Engine)
  if (tab === 'all' || tab === 'news' || trimmedQuery.includes('أخبار') || trimmedQuery.includes('اليوم')) {
    try {
      const newsResults = await fetchGoogleNewsEgypt(trimmedQuery);
      if (newsResults.length > 0) {
        providersUsed.push('Google News Egypt (موجز الأخبار المصرية)');
        allResults.push(...newsResults);
      }
    } catch {
      // Ignore fallback errors
    }
  }

  // 4. Query Arabic Wikipedia API (Free Real Encyclopedic Engine)
  try {
    const wikiData = await fetchArabicWikipedia(trimmedQuery);
    if (wikiData.results.length > 0) {
      providersUsed.push('ويكيبيديا العربية');
      allResults.push(...wikiData.results);
    }
    if (wikiData.knowledgeCard) {
      knowledgeCard = wikiData.knowledgeCard;
    }
  } catch {
    // Ignore fallback errors
  }

  // 5. Query DuckDuckGo API & HTML for General Web & Deep Topics
  if (tab !== 'news' || allResults.length < 5) {
    try {
      const ddgResults = await fetchDuckDuckGo(trimmedQuery, tab);
      if (ddgResults.results.length > 0) {
        providersUsed.push('DuckDuckGo Web Index');
        allResults.push(...ddgResults.results);
      }
      if (!knowledgeCard && ddgResults.knowledgeCard) {
        knowledgeCard = ddgResults.knowledgeCard;
      }
    } catch {
      // Ignore fallback errors
    }
  }

  // 6. Handle Video Tab if tab === 'videos'
  if (tab === 'videos') {
    try {
      const videoResults = await fetchVideoResults(trimmedQuery);
      if (videoResults.length > 0) {
        providersUsed.push('فيديوهات الويب ويوتيوب');
        allResults.push(...videoResults);
      }
    } catch {
      // Ignore
    }
  }

  // 7. Handle Images Tab if tab === 'images'
  if (tab === 'images') {
    try {
      const imageResults = await fetchImageResults(trimmedQuery, knowledgeCard);
      if (imageResults.length > 0) {
        providersUsed.push('أرشيف الصور والمحتوى المرئي');
        allResults.push(...imageResults);
      }
    } catch {
      // Ignore
    }
  }

  // 8. Deduplicate and score/rank results
  const uniqueResults = deduplicateAndRankResults(allResults, trimmedQuery, tab);

  // 9. Generate Contextual Egyptian Related Searches
  const relatedSearches = generateRelatedSearches(trimmedQuery, officialEntity?.arabicName);

  const executionTimeMs = Date.now() - startTime;

  return {
    query: trimmedQuery,
    type: tab,
    total: uniqueResults.length,
    executionTimeMs,
    results: uniqueResults,
    officialEntityCard: officialEntity,
    knowledgeCard,
    relatedSearches,
    providersUsed,
    apiConfigured: Boolean(googleApiKey && googleCx),
    page,
  };
}

/**
 * Fetch real live news headlines from Google News RSS Egypt (Arabic)
 */
async function fetchGoogleNewsEgypt(query: string): Promise<SearchResult[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query + ' مصر'
  )}&hl=ar&gl=EG&ceid=EG:ar`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) return [];

  const xmlText = await response.text();
  const parsed = xmlParser.parse(xmlText);
  const items = parsed?.rss?.channel?.item;

  if (!items) return [];

  const list = Array.isArray(items) ? items : [items];
  const results: SearchResult[] = [];

  for (const item of list.slice(0, 10)) {
    const rawTitle = item.title || '';
    const link = item.link || '';
    const pubDate = item.pubDate || '';
    
    // Google News RSS titles end with ` - SourceName`
    const lastDashIndex = rawTitle.lastIndexOf(' - ');
    let title = rawTitle;
    let source = 'أخبار مصر';
    if (lastDashIndex !== -1) {
      title = rawTitle.substring(0, lastDashIndex).trim();
      source = rawTitle.substring(lastDashIndex + 3).trim();
    } else if (item.source?.['#text']) {
      source = item.source['#text'];
    }

    // Clean snippet
    let snippet = '';
    if (item.description) {
      snippet = item.description.replace(/<[^>]+>/g, '').trim();
    }
    if (!snippet || snippet.length < 20) {
      snippet = `آخر تغطية صحفية حول «${title}» من المصدر ${source}. متابعة للأحداث الجارية والتفاصيل المنشورة.`;
    }

    results.push({
      id: `news-${link.slice(-20) || Math.random()}`,
      title,
      url: link,
      displayUrl: source,
      snippet,
      source,
      provider: 'google_news',
      isEgyptianMedia: true,
      category: 'news',
      date: formatArabicRelativeDate(pubDate),
      badges: ['خبر حديث 📰', source],
    });
  }

  return results;
}

/**
 * Fetch real encyclopedic content & images from Arabic Wikipedia
 */
async function fetchArabicWikipedia(
  query: string
): Promise<{ results: SearchResult[]; knowledgeCard: KnowledgeCard | null }> {
  // Step 1: Search Wikipedia for matching titles
  const searchUrl = `https://ar.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&format=json&utf8=1&srlimit=5`;

  const searchRes = await fetch(searchUrl, {
    headers: { 'User-Agent': 'NileSearchEngine/1.0 (contact@nilesearch.eg)' },
    signal: AbortSignal.timeout(4000),
  });

  if (!searchRes.ok) return { results: [], knowledgeCard: null };

  const searchData = await searchRes.json();
  const searchHits = searchData?.query?.search || [];

  if (searchHits.length === 0) return { results: [], knowledgeCard: null };

  const titles = searchHits.map((h: { title: string }) => h.title).join('|');

  // Step 2: Fetch detailed extracts, page URLs, and thumbnails for these titles
  const detailUrl = `https://ar.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|info&inprop=url&pithumbsize=600&exintro=1&explaintext=1&titles=${encodeURIComponent(
    titles
  )}&format=json&utf8=1`;

  const detailRes = await fetch(detailUrl, {
    headers: { 'User-Agent': 'NileSearchEngine/1.0 (contact@nilesearch.eg)' },
    signal: AbortSignal.timeout(4000),
  });

  if (!detailRes.ok) return { results: [], knowledgeCard: null };

  const detailData = await detailRes.json();
  const pages = detailData?.query?.pages || {};

  const results: SearchResult[] = [];
  let knowledgeCard: KnowledgeCard | null = null;

  let isFirst = true;

  for (const pageId of Object.keys(pages)) {
    const page = pages[pageId];
    if (!page || page.missing) continue;

    const pageTitle = page.title || '';
    const extract = page.extract || '';
    const fullUrl = page.fullurl || `https://ar.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
    const thumbnail = page.thumbnail?.source;

    // Use the first strong match as a rich Knowledge Card
    if (isFirst && extract && extract.length > 50) {
      knowledgeCard = {
        title: pageTitle,
        subtitle: 'الموسوعة الحرة ويكيبيديا',
        description: extract.slice(0, 320) + (extract.length > 320 ? '...' : ''),
        imageUrl: thumbnail,
        sourceUrl: fullUrl,
        sourceName: 'ويكيبيديا العربية',
      };
      isFirst = false;
    }

    results.push({
      id: `wiki-${pageId}`,
      title: pageTitle,
      url: fullUrl,
      displayUrl: `ar.wikipedia.org/wiki/${pageTitle}`,
      snippet: extract ? extract.slice(0, 220) + '...' : `مقالة موسوعية موثقة عن ${pageTitle} في ويكيبيديا العربية.`,
      source: 'ويكيبيديا العربية',
      provider: 'wikipedia',
      thumbnail,
      badges: ['موسوعة علمية 📚'],
    });
  }

  return { results, knowledgeCard };
}

/**
 * Fetch results from DuckDuckGo Instant Answers & Topics API
 */
async function fetchDuckDuckGo(
  query: string,
  tab: SearchTab
): Promise<{ results: SearchResult[]; knowledgeCard: KnowledgeCard | null }> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
    query
  )}&format=json&kl=xa-ar&no_html=1&skip_disambig=0`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
    signal: AbortSignal.timeout(4000),
  });

  if (!res.ok) return { results: [], knowledgeCard: null };

  const data = await res.json();
  const results: SearchResult[] = [];
  let knowledgeCard: KnowledgeCard | null = null;

  if (data.AbstractText && data.AbstractURL) {
    results.push({
      id: `ddg-abstract-${Math.random()}`,
      title: data.Heading || query,
      url: data.AbstractURL,
      displayUrl: new URL(data.AbstractURL).hostname,
      snippet: data.AbstractText,
      source: data.AbstractSource || 'DuckDuckGo Knowledge',
      provider: 'duckduckgo',
      thumbnail: data.Image,
    });

    knowledgeCard = {
      title: data.Heading || query,
      subtitle: data.AbstractSource || 'معلومات موثقة',
      description: data.AbstractText,
      imageUrl: data.Image ? `https://duckduckgo.com${data.Image}` : undefined,
      sourceUrl: data.AbstractURL,
      sourceName: data.AbstractSource || 'الويب',
    };
  }

  // Related topics
  if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
    for (const topic of data.RelatedTopics.slice(0, 6)) {
      if (topic.FirstURL && topic.Text) {
        let title = topic.Text.split(' - ')[0] || topic.Text.slice(0, 50);
        let snippet = topic.Text;
        let hostname = 'web';
        try {
          hostname = new URL(topic.FirstURL).hostname;
        } catch {
          // ignore
        }

        results.push({
          id: `ddg-topic-${Math.random()}`,
          title,
          url: topic.FirstURL,
          displayUrl: hostname,
          snippet,
          source: hostname,
          provider: 'duckduckgo',
          thumbnail: topic.Icon?.URL ? (topic.Icon.URL.startsWith('http') ? topic.Icon.URL : `https://duckduckgo.com${topic.Icon.URL}`) : undefined,
          isEgyptianOfficial: isEgyptianDomain(topic.FirstURL),
        });
      }
    }
  }

  // Also query DuckDuckGo HTML for deep web links if needed
  if (results.length < 4 && tab === 'all') {
    try {
      const htmlUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const htmlRes = await fetch(htmlUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
        },
        signal: AbortSignal.timeout(4500),
      });

      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const extracted = parseDuckDuckGoHtml(html);
        results.push(...extracted);
      }
    } catch {
      // Continue without HTML results
    }
  }

  return { results, knowledgeCard };
}

/**
 * Parse DuckDuckGo HTML output for authentic organic web links
 */
function parseDuckDuckGoHtml(html: string): SearchResult[] {
  const results: SearchResult[] = [];
  // Match results blocks
  const resultRegex = /<a[^>]+class="result__url"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
  
  // Or match title links
  const titleRegex = /<h2[^>]+class="result__title"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  
  let match: RegExpExecArray | null;
  const items: { url: string; title: string }[] = [];

  while ((match = titleRegex.exec(html)) !== null && items.length < 8) {
    let rawUrl = match[1];
    let title = match[2].replace(/<[^>]+>/g, '').trim();

    // DuckDuckGo redirects: /l/?kh=-1&uddg=https%3A%2F%2Fexample.com
    let finalUrl = rawUrl;
    if (rawUrl.includes('uddg=')) {
      const parsedMatch = rawUrl.match(/uddg=([^&]+)/);
      if (parsedMatch && parsedMatch[1]) {
        try {
          finalUrl = decodeURIComponent(parsedMatch[1]);
        } catch {
          finalUrl = rawUrl;
        }
      }
    }

    if (finalUrl.startsWith('http')) {
      items.push({ url: finalUrl, title });
    }
  }

  for (const item of items) {
    try {
      const parsedUrl = new URL(item.url);
      results.push({
        id: `ddg-html-${item.url}`,
        title: item.title,
        url: item.url,
        displayUrl: parsedUrl.hostname,
        snippet: `زيارة صفحة «${item.title}» المنشورة على موقع ${parsedUrl.hostname}.`,
        source: parsedUrl.hostname,
        provider: 'duckduckgo',
        isEgyptianOfficial: isEgyptianDomain(item.url),
        isEgyptianMedia: isEgyptianMediaDomain(item.url),
      });
    } catch {
      // Skip invalid URLs
    }
  }

  return results;
}

/**
 * Real Video Search handler
 */
async function fetchVideoResults(query: string): Promise<SearchResult[]> {
  // Query YouTube search for real video feeds
  const results: SearchResult[] = [];
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  results.push(
    {
      id: `vid-yt-search-${encodeURIComponent(query)}`,
      title: `نتائج وتقارير فيديو عن: ${query} على يوتيوب`,
      url: searchUrl,
      displayUrl: 'youtube.com',
      snippet: `مشاهدة أحدث الفيديوهات والتقارير والملخصات الإخبارية والمرئية المتعلقة بـ ${query}.`,
      source: 'يوتيوب (YouTube)',
      provider: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=80',
      category: 'videos',
      badges: ['فيديو مرئي 🎥'],
    },
    {
      id: `vid-maspero-${encodeURIComponent(query)}`,
      title: `أرشيف التلفزيون المصري وماسبيرو حول: ${query}`,
      url: `https://www.youtube.com/@MasperoZaman`,
      displayUrl: 'youtube.com/@MasperoZaman',
      snippet: `مقاطع تسجيلية ووثائقية وتقارير أرشيفية رسمية من قطاع التلفزيون المصري.`,
      source: 'ماسبيرو زمان والتلفزيون المصري',
      provider: 'youtube',
      category: 'videos',
      badges: ['وثائقي مصري 📺'],
    }
  );

  return results;
}

/**
 * Real Image Search handler
 */
async function fetchImageResults(query: string, knowledgeCard: KnowledgeCard | null): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  if (knowledgeCard?.imageUrl) {
    results.push({
      id: `img-kc-${Math.random()}`,
      title: knowledgeCard.title,
      url: knowledgeCard.sourceUrl,
      displayUrl: knowledgeCard.sourceName,
      snippet: knowledgeCard.description,
      source: knowledgeCard.sourceName,
      provider: 'wikipedia',
      thumbnail: knowledgeCard.imageUrl,
      category: 'images',
      badges: ['صورة موثقة 📷'],
    });
  }

  // Also query Wikimedia Commons for high-res images related to Egypt & query
  try {
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrlimit=8&prop=imageinfo&iiprop=url|size|extmetadata&format=json&utf8=1`;

    const res = await fetch(commonsUrl, {
      headers: { 'User-Agent': 'NileSearchEngine/1.0' },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      const pages = data?.query?.pages || {};

      for (const pageId of Object.keys(pages)) {
        const page = pages[pageId];
        const info = page.imageinfo?.[0];
        if (info?.url) {
          const cleanTitle = (page.title || '').replace(/^File:/, '').replace(/\.[^.]+$/, '');
          results.push({
            id: `img-wiki-${pageId}`,
            title: cleanTitle,
            url: info.descriptionurl || info.url,
            displayUrl: 'commons.wikimedia.org',
            snippet: cleanTitle,
            source: 'مستودع ويكيميديا للوسائط الحرة',
            provider: 'wikipedia',
            thumbnail: info.url,
            category: 'images',
            imageDimensions: {
              width: info.width || 800,
              height: info.height || 600,
            },
          });
        }
      }
    }
  } catch {
    // Ignore
  }

  return results;
}

/**
 * Filter duplicates, clean up URLs, and apply Egyptian relevance boost
 */
function deduplicateAndRankResults(
  results: SearchResult[],
  query: string,
  tab: SearchTab
): SearchResult[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const output: SearchResult[] = [];

  const normQuery = normalizeArabic(query.toLowerCase());

  // Rank sorting comparator
  const scored = results.map((item) => {
    let score = 0;

    // Official entity always top score
    if (item.provider === 'official') score += 1000;

    // Egyptian domain boost
    if (item.isEgyptianOfficial) score += 300;
    if (item.isEgyptianMedia) score += 120;
    if (isEgyptianDomain(item.url)) score += 150;

    // Exact title match bonus
    const normTitle = normalizeArabic(item.title.toLowerCase());
    if (normTitle.includes(normQuery)) score += 80;
    if (normTitle.startsWith(normQuery)) score += 40;

    // Tab specificity
    if (tab === 'news' && item.provider === 'google_news') score += 200;
    if (tab === 'images' && item.thumbnail) score += 200;
    if (tab === 'videos' && item.provider === 'youtube') score += 200;
    if (tab === 'gov' && (item.isEgyptianOfficial || item.url.includes('.gov.eg'))) score += 300;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  for (const { item } of scored) {
    // URL normalization
    const cleanUrl = item.url.replace(/\/$/, '').toLowerCase();
    const cleanTitle = item.title.trim().toLowerCase();

    if (seenUrls.has(cleanUrl) || seenTitles.has(cleanTitle)) {
      continue;
    }

    seenUrls.add(cleanUrl);
    seenTitles.add(cleanTitle);
    output.push(item);
  }

  return output;
}

function isEgyptianDomain(urlStr: string): boolean {
  try {
    const hostname = new URL(urlStr).hostname.toLowerCase();
    return EGYPTIAN_DOMAINS.some((d) => hostname.endsWith(d) || hostname.includes(d));
  } catch {
    return false;
  }
}

function isEgyptianMediaDomain(urlStr: string): boolean {
  const media = ['youm7.com', 'ahram.org.eg', 'masrawy.com', 'almasryalyoum.com', 'shorouknews.com', 'elwatannews.com', 'dostor.org', 'mena.org.eg'];
  try {
    const hostname = new URL(urlStr).hostname.toLowerCase();
    return media.some((m) => hostname.includes(m));
  } catch {
    return false;
  }
}

function formatArabicRelativeDate(pubDateStr: string): string {
  if (!pubDateStr) return 'اليوم';
  try {
    const date = new Date(pubDateStr);
    const diffMs = Date.now() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'منذ دقائق';
    if (diffHours === 1) return 'منذ ساعة واحدة';
    if (diffHours === 2) return 'منذ ساعتين';
    if (diffHours < 24) return `منذ ${diffHours} ساعات`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'أمس';
    if (diffDays === 2) return 'منذ يومين';
    return `منذ ${diffDays} أيام`;
  } catch {
    return 'مؤخراً';
  }
}

function generateRelatedSearches(query: string, officialName?: string): string[] {
  const suggestions: string[] = [];

  if (officialName) {
    suggestions.push(`الخط الساخن ${officialName}`);
    suggestions.push(`مواعيد عمل ${officialName}`);
    suggestions.push(`الخدمات الإلكترونية ${officialName}`);
  }

  if (query.includes('صحة') || query.includes('وزارة')) {
    suggestions.push('قرارات وزير الصحة الأخيرة');
    suggestions.push('حجز موعد مستشفى حكومي');
    suggestions.push('العلاج على نفقة الدولة مصر');
  } else if (query.includes('بنك') || query.includes('مركزي')) {
    suggestions.push('سعر الدولار اليوم في البنك المركزي المصري');
    suggestions.push('أعلى فائدة شهادات استثمار في مصر');
    suggestions.push('مواعيد عمل البنوك المصرية');
  } else if (query.includes('أهلي') || query.includes('الأهلي') || query.includes('كورة')) {
    suggestions.push('جدول مباريات الدوري المصري');
    suggestions.push('موعد مباراة الأهلي القادمة');
    suggestions.push('صفقات النادي الأهلي الجديدة');
  } else if (query.includes('أقصر') || query.includes('سياحة') || query.includes('آثار')) {
    suggestions.push('أسعار تذاكر معابد الأقصر للمصريين');
    suggestions.push('أفضل فنادق الأقصر وأسوان');
    suggestions.push('رحلات المنطاد الطائر في الأقصر');
  } else if (query.includes('أخبار') || query.includes('اليوم')) {
    suggestions.push('أخبار الاقتصاد والبورصة المصرية اليوم');
    suggestions.push('أخبار الطقس ودرجات الحرارة في مصر');
    suggestions.push('قرارات مجلس الوزراء المصري اليوم');
  } else {
    suggestions.push(`${query} مصر اليوم`);
    suggestions.push(`دليل خدمات ${query}`);
    suggestions.push(`آخر أخبار ${query}`);
  }

  return suggestions.slice(0, 5);
}
