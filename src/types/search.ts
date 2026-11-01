export type SearchTab = 'all' | 'news' | 'images' | 'videos' | 'gov';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  source: string;
  provider: 'official' | 'google_news' | 'wikipedia' | 'duckduckgo' | 'google_custom' | 'youtube';
  isEgyptianOfficial?: boolean;
  isEgyptianMedia?: boolean;
  date?: string;
  thumbnail?: string;
  category?: SearchTab;
  deepLinks?: { title: string; url: string; snippet?: string }[];
  badges?: string[];
  imageDimensions?: { width: number; height: number };
}

export interface OfficialEntity {
  id: string;
  name: string;
  arabicName: string;
  aliases: string[];
  url: string;
  category: 'gov' | 'finance' | 'sports' | 'tourism' | 'health' | 'education' | 'culture';
  categoryLabel: string;
  description: string;
  phone?: string;
  address?: string;
  subLinks: { title: string; url: string; description?: string }[];
  socialLinks?: { platform: string; url: string }[];
  verified: boolean;
  logo?: string;
}

export interface KnowledgeCard {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  attributes?: { label: string; value: string }[];
}

export interface SearchResponse {
  query: string;
  type: SearchTab;
  total: number;
  executionTimeMs: number;
  results: SearchResult[];
  officialEntityCard?: OfficialEntity | null;
  knowledgeCard?: KnowledgeCard | null;
  relatedSearches: string[];
  providersUsed: string[];
  apiConfigured: boolean;
  page: number;
}

export interface EgyptianWidgetsData {
  updatedAt: string;
  currencies: {
    base: string;
    items: { code: string; nameAr: string; buy: number; sell: number; change: string }[];
  };
  gold: {
    unit: string;
    items: { karat: string; nameAr: string; price: number; change: string }[];
  };
  weather: {
    city: string;
    temp: number;
    conditionAr: string;
    high: number;
    low: number;
    humidity: number;
  };
  prayerTimes: {
    city: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}
