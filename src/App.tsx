import React, { useState, useEffect } from 'react';
import { NileLogo } from './components/NileLogo';
import { Header } from './components/Header';
import { SearchBox } from './components/SearchBox';
import { TabsBar } from './components/TabsBar';
import { ResultCard } from './components/ResultCard';
import { KnowledgePanel } from './components/KnowledgePanel';
import { ImageResultsGrid } from './components/ImageResultsGrid';
import { VideoResultsList } from './components/VideoResultsList';
import { WidgetsDrawer } from './components/WidgetsDrawer';
import { SearchHistoryModal } from './components/SearchHistoryModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ProvidersModal } from './components/ProvidersModal';
import { FounderModal } from './components/FounderModal';
import { useSearchHistory } from './hooks/useSearchHistory';
import { SearchResponse, SearchTab } from './types/search';
import {
  Sparkles,
  TrendingUp,
  Search,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Newspaper,
  Compass,
  Trophy,
  Landmark,
  Coins,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers state
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isProvidersOpen, setIsProvidersOpen] = useState(false);
  const [isFounderOpen, setIsFounderOpen] = useState(false);

  // Local storage history
  const { history, addQuery, removeQuery, clearHistory } = useSearchHistory();

  // Egyptian Recommended Queries for testing and discovery
  const TEST_QUERIES = [
    { label: 'وزارة الصحة المصرية', icon: <Building2 className="w-4 h-4 text-emerald-600" />, tag: 'جهة رسمية' },
    { label: 'أخبار مصر اليوم', icon: <Newspaper className="w-4 h-4 text-red-600" />, tag: 'عاجل' },
    { label: 'السياحة في الأقصر', icon: <Compass className="w-4 h-4 text-amber-600" />, tag: 'آثار وسياحة' },
    { label: 'النادي الأهلي المصري', icon: <Trophy className="w-4 h-4 text-red-700" />, tag: 'رياضة' },
    { label: 'البنك المركزي المصري', icon: <Landmark className="w-4 h-4 text-blue-700" />, tag: 'اقتصاد' },
  ];

  const POPULAR_TOPICS = [
    'سعر الذهب عيار 21 في مصر',
    'بوابة مصر الرقمية',
    'مواعيد مباريات الدوري المصري',
    'أسعار الدولار في البنوك المصرية',
    'المتحف المصري الكبير',
    'درجات الحرارة اليوم',
  ];

  // Perform real search
  const handleSearch = async (queryText: string, tab: SearchTab = activeTab) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setCurrentQuery(trimmed);
    setActiveTab(tab);
    setIsLoading(true);
    setError(null);
    addQuery(trimmed);

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&type=${tab}`);
      if (!res.ok) {
        throw new Error('فشل جلب النتائج من خادم البحث');
      }
      const data: SearchResponse = await res.json();
      setSearchResponse(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (newTab: SearchTab) => {
    setActiveTab(newTab);
    if (currentQuery) {
      handleSearch(currentQuery, newTab);
    }
  };

  const handleReturnHome = () => {
    setCurrentQuery('');
    setSearchResponse(null);
    setError(null);
    setActiveTab('all');
  };

  // Feeling lucky handler
  const handleLuckySearch = () => {
    const luckyList = [
      'وزارة الصحة المصرية',
      'البنك المركزي المصري',
      'السياحة في الأقصر',
      'النادي الأهلي المصري',
      'المتحف المصري الكبير',
      'هيئة قناة السويس',
    ];
    const picked = luckyList[Math.floor(Math.random() * luckyList.length)];
    handleSearch(picked);
  };

  const isSearchActive = Boolean(currentQuery || searchResponse || isLoading);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 font-['Cairo'] antialiased">
      {/* Top Header */}
      <Header
        variant={isSearchActive ? 'compact' : 'home'}
        onOpenWidgets={() => setIsWidgetsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenFounder={() => setIsFounderOpen(true)}
        onOpenProviders={() => setIsProvidersOpen(true)}
        onNavigateHome={handleReturnHome}
        onSelectCategory={(cat) => handleSearch(cat, 'all')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!isSearchActive ? (
          /* ================= HOMEPAGE VIEW ================= */
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-16 max-w-5xl mx-auto w-full">
            {/* Egyptian Flag Subtle Pill Kicker */}
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 select-none shadow-2xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B0F19]"></span>
              </span>
              <span>محرك البحث الوطني المصري والعربي الأول</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold">نتائج ويب حقيقية ومحدثة</span>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setIsFounderOpen(true)}
                className="text-slate-600 hover:text-red-700 font-semibold cursor-pointer underline decoration-dotted transition-colors"
              >
                عن المؤسس
              </button>
            </div>

            {/* Nile Giant Logo */}
            <div className="mb-8 cursor-pointer" onClick={handleReturnHome}>
              <NileLogo size="xl" showSubtitle={true} />
            </div>

            {/* Central Prominent Search Box */}
            <div className="w-full max-w-2xl mb-6">
              <SearchBox
                initialQuery={currentQuery}
                onSearch={(q) => handleSearch(q, 'all')}
                size="large"
                autoFocus={true}
                history={history}
                onSelectHistory={(q) => handleSearch(q, 'all')}
              />
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <button
                onClick={() => handleSearch(currentQuery || 'أخبار مصر اليوم', 'all')}
                className="px-6 py-2.5 bg-slate-900 hover:bg-[#C8102E] text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
              >
                بحث في نايل
              </button>
              <button
                onClick={handleLuckySearch}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium transition-all shadow-2xs hover:border-slate-300 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>ضربة حظ نيلية</span>
              </button>
              <button
                onClick={() => setIsWidgetsOpen(true)}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-sm font-medium transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-amber-700" />
                <span>أسعار الذهب والعملات اليوم</span>
              </button>
            </div>

            {/* Subtle Founder Credit Link */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setIsFounderOpen(true)}
                className="text-xs text-slate-500 hover:text-red-700 transition-colors inline-flex items-center gap-1.5 font-medium cursor-pointer py-1 px-2 rounded-lg hover:bg-red-50/50"
              >
                <span>صُنع بيد مصرية</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="underline decoration-dotted decoration-slate-400 hover:decoration-red-600 font-semibold text-slate-700 hover:text-red-700">
                  عن المؤسس: محمد حسن قنديل
                </span>
              </button>
            </div>

            {/* Test Queries Required By The User */}
            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500 px-1">
                <span>اختبارات البحث الأساسية (روابط ونتائج حقيقية):</span>
                <span className="font-semibold text-emerald-700">اضغط لتجربة الاستعلام فوراً</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {TEST_QUERIES.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(t.label, 'all')}
                    className="p-3 bg-white hover:bg-red-50/40 border border-slate-200 hover:border-red-300 rounded-xl flex items-center justify-between text-right transition-all group shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                        {t.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors">
                        {t.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-red-500 font-mono">
                      {t.tag}
                    </span>
                  </button>
                ))}

                {/* Additional Sixth Query: Digital Egypt */}
                <button
                  onClick={() => handleSearch('بوابة مصر الرقمية للخدمات الحكومية', 'all')}
                  className="p-3 bg-white hover:bg-red-50/40 border border-slate-200 hover:border-red-300 rounded-xl flex items-center justify-between text-right transition-all group shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors">
                      بوابة مصر الرقمية
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-red-500 font-mono">
                    خدمات المواطن
                  </span>
                </button>
              </div>
            </div>

            {/* Popular Egyptian Trends Chips */}
            <div className="w-full max-w-2xl text-center">
              <span className="text-xs font-semibold text-slate-400 block mb-2.5">
                عمليات بحث رائجة في مصر الآن:
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {POPULAR_TOPICS.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(topic, 'all')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ================= SEARCH RESULTS VIEW ================= */
          <div className="flex-1 flex flex-col">
            {/* Results Search Bar Header Bar */}
            <div className="bg-white border-b border-slate-200 pt-4 pb-2 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:max-w-2xl">
                  <SearchBox
                    initialQuery={currentQuery}
                    onSearch={(q) => handleSearch(q, activeTab)}
                    size="compact"
                    history={history}
                    onSelectHistory={(q) => handleSearch(q, activeTab)}
                  />
                </div>
              </div>
            </div>

            {/* Classification Tabs Bar */}
            <TabsBar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              resultCount={searchResponse?.total}
            />

            {/* Results Statistics & Metadata Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 text-xs text-slate-500 flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 w-full">
              <div className="flex items-center gap-2">
                <span>
                  نتائج البحث عن «<strong>{currentQuery}</strong>»:
                </span>
                {searchResponse && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{searchResponse.total} نتيجة</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">({(searchResponse.executionTimeMs / 1000).toFixed(2)} ثانية)</span>
                  </>
                )}
              </div>

              {searchResponse?.providersUsed && searchResponse.providersUsed.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>المصادر:</span>
                  <span className="text-slate-600 font-medium">
                    {searchResponse.providersUsed.join('، ')}
                  </span>
                </div>
              )}
            </div>

            {/* Results Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
              {isLoading ? (
                /* Loading Skeleton */
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="py-4 animate-pulse space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-48"></div>
                        <div className="h-5 bg-slate-300 rounded w-3/4"></div>
                        <div className="h-3.5 bg-slate-200 rounded w-full"></div>
                        <div className="h-3.5 bg-slate-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full lg:w-80 h-72 bg-slate-100 rounded-2xl animate-pulse"></div>
                </div>
              ) : error ? (
                /* Error State */
                <div className="py-16 text-center max-w-md mx-auto">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">تعذر استرجاع النتائج</h3>
                  <p className="text-sm text-slate-600 mb-4">{error}</p>
                  <button
                    onClick={() => handleSearch(currentQuery, activeTab)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة المحاولة</span>
                  </button>
                </div>
              ) : searchResponse && searchResponse.results.length === 0 ? (
                /* Empty Results State */
                <div className="py-16 text-center max-w-lg mx-auto">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    لم يُعثر على نتائج مطابقة لـ «{currentQuery}»
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    تأكد من كتابة الكلمات بشكل صحيح، أو جرّب استخدام كلمات مرادفة أو أقل تخصيصاً.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {TEST_QUERIES.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(t.label, 'all')}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-red-400 text-xs font-medium text-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'images' ? (
                /* Images Tab Grid */
                <ImageResultsGrid results={searchResponse?.results || []} />
              ) : activeTab === 'videos' ? (
                /* Videos Tab List */
                <VideoResultsList results={searchResponse?.results || []} />
              ) : (
                /* All & News & Gov Tab View */
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Left Column: Organic Web Results */}
                  <div className="flex-1 w-full max-w-3xl">
                    {/* If in Gov Tab, filter or emphasize government */}
                    <div className="space-y-1">
                      {searchResponse?.results.map((result) => (
                        <ResultCard key={result.id} result={result} />
                      ))}
                    </div>

                    {/* Related Searches Section */}
                    {searchResponse?.relatedSearches && searchResponse.relatedSearches.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <Search className="w-4 h-4 text-red-600" />
                          <span>عمليات بحث ذات صلة في مصر:</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {searchResponse.relatedSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => handleSearch(term, activeTab)}
                              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                            >
                              <Search className="w-3.5 h-3.5 text-slate-400" />
                              <span>{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Verified Egyptian Entity / Knowledge Panel */}
                  <KnowledgePanel
                    officialEntity={searchResponse?.officialEntityCard}
                    knowledgeCard={searchResponse?.knowledgeCard}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">نايل – Nile Egyptian Search</span>
              <span>🇪🇬</span>
              <span aria-hidden="true">·</span>
              <span>جمهورية مصر العربية</span>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                عن نايل
              </button>
              <button
                onClick={() => setIsFounderOpen(true)}
                className="hover:text-red-700 font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                عن المؤسس
              </button>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                الخصوصية والأمان
              </button>
              <button
                onClick={() => setIsProvidersOpen(true)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                مزودو البحث والـ API
              </button>
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                سجل البحث
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-out & Modals */}
      <WidgetsDrawer
        isOpen={isWidgetsOpen}
        onClose={() => setIsWidgetsOpen(false)}
        onSelectQuery={(q) => handleSearch(q, 'all')}
      />

      <SearchHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectQuery={(q) => handleSearch(q, 'all')}
        onRemoveQuery={removeQuery}
        onClearAll={clearHistory}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <FounderModal
        isOpen={isFounderOpen}
        onClose={() => setIsFounderOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ProvidersModal
        isOpen={isProvidersOpen}
        onClose={() => setIsProvidersOpen(false)}
      />
    </div>
  );
}
