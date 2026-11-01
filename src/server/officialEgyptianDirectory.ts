import { OfficialEntity } from '../types/search.js';

export const OFFICIAL_EGYPTIAN_ENTITIES: OfficialEntity[] = [
  {
    id: 'mohp-eg',
    name: 'Ministry of Health and Population Egypt',
    arabicName: 'وزارة الصحة والسكان المصرية',
    aliases: [
      'وزارة الصحة',
      'وزارة الصحة المصرية',
      'وزاره الصحه',
      'وزارة الصحة والسكان',
      'الصحة المصرية',
      'مستشفيات وزارة الصحة',
      '100 مليون صحة',
      'mohp',
      'mohp egypt',
    ],
    url: 'https://mohp.gov.eg',
    category: 'health',
    categoryLabel: 'جهة حكومية رسمية 🇪🇬',
    description: 'البوابة الرسمية لوزارة الصحة والسكان بجمهورية مصر العربية. المنصة المعتمدة للمبادرات الرئاسية الصحية، وخدمات العلاج على نفقة الدولة، والتطعيمات، والقرارات الوزارية الرسمية وتراخيص مزاولة المهنة.',
    phone: 'الخط الساخن: 105 / 15335',
    address: 'شارع مجلس الشعب، القصر العيني، القاهرة / الحي الحكومي، العاصمة الإدارية الجديدة',
    verified: true,
    subLinks: [
      { title: 'مبادرة 100 مليون صحة', url: 'https://mohp.gov.eg/Section.aspx?id=12', description: 'المبادرات الرئاسية للفحص والكشف المبكر وعلاج الأمراض المزمنة' },
      { title: 'بوابة التطعيمات ولقاحات السفر', url: 'https://mohp.gov.eg', description: 'مراكز التطعيم الدولية وشهادات التطعيم المعتمدة' },
      { title: 'المجالس الطبية المتخصصة - نفقة الدولة', url: 'http://smcegy.com', description: 'استعلام وتجديد قرارات العلاج على نفقة الدولة' },
      { title: 'دليل المستشفيات والوحدات الصحية', url: 'https://mohp.gov.eg', description: 'عناوين وأرقام الطوارئ وبنوك الدم بالمحافظات' }
    ]
  },
  {
    id: 'cbe-eg',
    name: 'Central Bank of Egypt',
    arabicName: 'البنك المركزي المصري',
    aliases: [
      'البنك المركزي',
      'البنك المركزي المصري',
      'مركزي مصر',
      'البنك المركزي في مصر',
      'اسعار الفائدة البنك المركزي',
      'cbe',
      'central bank of egypt',
    ],
    url: 'https://www.cbe.org.eg',
    category: 'finance',
    categoryLabel: 'مؤسسة نقدية سيادية 🇪🇬',
    description: 'السلطة النقدية والرقابية العليا على الجهاز المصرفي في جمهورية مصر العربية، والمسؤول عن إصدار الجنيه المصري، وإدارة الاحتياطي النقدي الأجنبي، وتحديد أسعار الفائدة والسياسات النقدية والشمول المالي.',
    phone: 'الخط الساخن للشكاوى المصرفية: 16777',
    address: '54 شارع الجمهورية، وسط البلد، القاهرة / المقر الإداري، العاصمة الإدارية الجديدة',
    verified: true,
    subLinks: [
      { title: 'أسعار الصرف الرسمية للعملات', url: 'https://www.cbe.org.eg/ar/economic-research/exchange-rates', description: 'سعر الدولار واليورو والعملات الأجنبية مقابل الجنيه المصري لحظة بلحظة' },
      { title: 'قرارات لجنة السياسة النقدية', url: 'https://www.cbe.org.eg/ar/monetary-policy/monetary-policy-committee', description: 'مواعيد الاجتماعات وقرارات أسعار الفائدة للإيداع والإقراض' },
      { title: 'التعليمات والكتب الدورية للبنوك', url: 'https://www.cbe.org.eg/ar/banking-supervision/circulars', description: 'اللوائح التنظيمية لمكافحة غسل الأموال وتسهيلات المستوردين' },
      { title: 'شبكة المدفوعات اللحظية (إنستاباي - InstaPay)', url: 'https://www.instapay.eg', description: 'خدمات التحويل البنكي الفوري المعتمدة من البنك المركزي' }
    ]
  },
  {
    id: 'luxor-tourism',
    name: 'Tourism in Luxor Egypt',
    arabicName: 'السياحة في الأقصر - عاصمة الحضارة الفرعونية',
    aliases: [
      'السياحة في الأقصر',
      'السياحه في الاقصر',
      'الأقصر',
      'معالم الأقصر',
      'معبد الكرنك',
      'وادي الملوك',
      'سياحة الاقصر',
      'luxor tourism',
      'luxor egypt',
    ],
    url: 'https://www.egypt.travel/en/regions/nile-valley/luxor',
    category: 'tourism',
    categoryLabel: 'وجهة سياحية وأثرية عالمية 🏛️',
    description: 'الأقصر تضم أكثر من ثلث آثار العالم القديم، وعاصمة مصر القديمة (طيبة). تشتهر بمعابد الكرنك والأقصر، ووادي الملوك، ومقبرة توت عنخ آمون، والمنطاد الطائر (الهوت إير بالون)، والرحلات النيلية الخلابة.',
    phone: 'الخط الساخن لوزارة السياحة والآثار: 19654',
    address: 'محافظة الأقصر، صعيد مصر (ضفاف نهر النيل)',
    verified: true,
    subLinks: [
      { title: 'حجز تذاكر المتاحف والمعابد إلكترونيًا', url: 'https://egymonuments.com/locations/details/Luxor', description: 'بوابة وزارة السياحة والآثار لحجز زيارات الكرنك ووادي الملوك' },
      { title: 'دليل معبد الكرنك وطريق الكباش', url: 'https://www.egypt.travel', description: 'أكبر مجمع ديني في العالم القديم وطريق الاحتفالات الملكية بطول 2.7 كم' },
      { title: 'وادي الملوك ومقابر الفراعنة', url: 'https://egymonuments.gov.eg', description: 'مقابر ملوك الفراعنة في البر الغربي بما فيها مقبرة رمسيس السادس وتوت عنخ آمون' },
      { title: 'رحلات المنطاد الطائر والنايل كروز', url: 'https://www.egypt.travel', description: 'مشاهدة شروق الشمس فوق آثار طيبة والرحلات النيلية بين الأقصر وأسوان' }
    ]
  },
  {
    id: 'alahly-sc',
    name: 'Al Ahly Sporting Club',
    arabicName: 'النادي الأهلي للرياضة البدنية',
    aliases: [
      'النادي الأهلي',
      'النادي الأهلي المصري',
      'الأهلي',
      'الأهلي المصري',
      'نادي القرن الأفريقي',
      'اخبار الاهلي',
      'مباراة الاهلي اليوم',
      'al ahly',
      'al ahly sc',
      'alahly',
    ],
    url: 'https://www.alahlyegypt.com',
    category: 'sports',
    categoryLabel: 'نادي القرن الإفريقي 🦅⚽',
    description: 'تأسس عام 1907، النادي الأكثر تتويجًا بالبطولات في قارة إفريقيا والوطن العربي، وحامل الرقم القياسي في دوري أبطال إفريقيا والدوري المصري الممتاز والميداليات البرونزية بكأس العالم للأندية.',
    phone: 'خدمة الأعضاء والاشتراكات: 19070',
    address: 'شارع حسن حمدي، الجزيرة، الزمالك، القاهرة',
    verified: true,
    subLinks: [
      { title: 'جدول مباريات الفريق الأول لكرة القدم', url: 'https://www.alahlyegypt.com/ar/matches', description: 'مواعيد ونتائج مباريات الأهلي في الدوري المصري ودوري أبطال إفريقيا' },
      { title: 'قائمة اللاعبين وتشكيل الفريق', url: 'https://www.alahlyegypt.com/ar/football/team', description: 'الجهاز الفني بقيادة المدرب وقائمة نجوم الفريق الأول' },
      { title: 'قناة الأهلي الرسمية والبث المباشر', url: 'https://www.youtube.com/@AlAhly', description: 'الملخصات واللقاءات الحصرية والبرامج الرياضية' },
      { title: 'المتجر الرسمي لمنتجات الأهلي (الأهلي ستور)', url: 'https://www.alahlyegypt.com', description: 'القميص الرسمي والأدوات الرياضية الأصلية للنادي' }
    ]
  },
  {
    id: 'egypt-news-today',
    name: 'Egypt News Today',
    arabicName: 'بوابة أخبار مصر اليومية الرسمية والعاجلة',
    aliases: [
      'أخبار مصر اليوم',
      'اخبار مصر اليوم',
      'اخبار مصر',
      'أخبار مصر',
      'عاجل مصر',
      'جريدة الأهرام',
      'اليوم السابع',
      'وكالة أنباء الشرق الأوسط',
      'egypt news',
    ],
    url: 'https://gate.ahram.org.eg',
    category: 'gov',
    categoryLabel: 'تغطية إخبارية مصرية موثقة 📰',
    description: 'تغطية شاملة ومباشرة لآخر مستجدات الشأن المصري، والقرارات الرئاسية والحكومية، وأسعار السلع والذهب، ومتابعات الاقتصاد والرياضة عبر الصحف ووكالات الأنباء القومية والمستقلة المعتمدة.',
    verified: true,
    subLinks: [
      { title: 'بوابة الأهرام الرسمية', url: 'https://gate.ahram.org.eg', description: 'أعرق صحيفة قومية مصرية تصدر منذ عام 1875 تغطي الشأن السياسي والاقتصادي' },
      { title: 'وكالة أنباء الشرق الأوسط (أ.ش.أ - MENA)', url: 'https://www.mena.org.eg', description: 'وكالة الأنباء الرسمية للدولة المصرية ومصدر البيانات والبيانات الحكومية' },
      { title: 'موقع اليوم السابع', url: 'https://www.youm7.com', description: 'تغطيات حية للأخبار العاجلة والتحقيقات والتقارير المصورة المصرية' },
      { title: 'بوابة أخبار اليوم', url: 'https://akhbarelyom.com', description: 'مؤسسة أخبار اليوم الصحفية وأخبار المحافظات المصرية' }
    ]
  },
  {
    id: 'digital-egypt',
    name: 'Digital Egypt Portal',
    arabicName: 'منصة مصر الرقمية',
    aliases: [
      'مصر الرقمية',
      'بوابة مصر الرقمية',
      'خدمات مصر الرقمية',
      'التموين مصر الرقمية',
      'خدمات التوثيق',
      'digital egypt',
    ],
    url: 'https://digital.gov.eg',
    category: 'gov',
    categoryLabel: 'بوابة الخدمات الحكومية الرقمية 🇪🇬',
    description: 'المنصة الحكومية الموحدة لتقديم الخدمات الإلكترونية للمواطنين في مجالات التموين، والتوثيق، والمرور، والمحاكم، والسجل التجاري، والأحوال المدنية دون الحاجة لزيارة المصالح الحكومية.',
    phone: 'الخط الساخن للدعم الفني: 15999',
    verified: true,
    subLinks: [
      { title: 'خدمات بطاقات التموين', url: 'https://digital.gov.eg/categories/5f61763914b4360017105ca2', description: 'إضافة الأبناء، وتفعيل البطاقة التموينية، وطلب بدل الفاقد والتالف' },
      { title: 'خدمات الشهر العقاري والتوثيق', url: 'https://digital.gov.eg/categories/5f61763914b4360017105ca1', description: 'تحرير التوكيلات، وحجز موعد بفروع التوثيق، والاستعلام عن المحررات' },
      { title: 'خدمات رخص القيادة والمرور', url: 'https://digital.gov.eg/categories/5f61763914b4360017105ca4', description: 'تجديد رخصة المركبة والاستعلام عن المخالفات ودفع الرسوم' },
      { title: 'خدمات الأحوال المدنية', url: 'https://digital.gov.eg', description: 'استخراج شهادات الميلاد، وبطاقة الرقم القومي، والقيد العائلي' }
    ]
  },
  {
    id: 'egypt-cabinet',
    name: 'Egyptian Cabinet',
    arabicName: 'رئاسة مجلس الوزراء المصري',
    aliases: [
      'مجلس الوزراء',
      'مجلس الوزراء المصري',
      'رئاسة مجلس الوزراء',
      'قرارات مجلس الوزراء',
      'egyptian cabinet',
    ],
    url: 'https://www.cabinet.gov.eg',
    category: 'gov',
    categoryLabel: 'الحكومة المصرية الرسمية 🇪🇬',
    description: 'المقر الإلكتروني الرسمي لمجلس وزراء جمهورية مصر العربية لنشر القرارات الوزارية والبيانات الصحفية والاجتماعات الأسبوعية ومتابعة المشروعات القومية.',
    verified: true,
    subLinks: [
      { title: 'بوابة الشكاوى الحكومية الموحدة', url: 'https://www.shakwa.eg', description: 'الخط الساخن 16528 لاستقبال ومتابعة شكاوى المواطنين لدى كافة الجهات' },
      { title: 'مركز المعلومات ودعم اتخاذ القرار (IDSC)', url: 'https://www.idsc.gov.eg', description: 'التقارير الاقتصادية والاجتماعية واستطلاعات الرأي والبيانات الإحصائية' },
      { title: 'بيانات وقرارات الاجتماع الأسبوعي', url: 'https://www.cabinet.gov.eg/MeetingNews', description: 'أحدث حزم الحماية الاجتماعية والقرارات الاقتصادية للدولة' }
    ]
  },
  {
    id: 'tourism-antiquities',
    name: 'Ministry of Tourism and Antiquities',
    arabicName: 'وزارة السياحة والآثار المصرية',
    aliases: [
      'وزارة السياحة',
      'وزارة الاثار',
      'وزارة السياحة والاثار',
      'المتحف المصري الكبير',
      'المتحف القومي للحضارة',
      'حجز تذاكر الاهرامات',
      'egymonuments',
    ],
    url: 'https://egymonuments.gov.eg',
    category: 'tourism',
    categoryLabel: 'السياحة والآثار المصرية 🏛️',
    description: 'الجهة المسؤولة عن حماية وإدارة التراث الأثري والحضاري في مصر والمتاحف القومية والمناطق الأثرية والترويج السياحي.',
    phone: 'الخط الساخن: 19654',
    verified: true,
    subLinks: [
      { title: 'المتحف المصري الكبير (GEM)', url: 'https://visit-gem.com', description: 'حجز جولات العرض وزيارة البهو العظيم والدرج العظيم' },
      { title: 'المتحف القومي للحضارة المصرية (NMEC)', url: 'https://nmec.gov.eg', description: 'قاعة المومياوات الملكية ومقتنيات الحضارة عبر العصور بالفسطاط' },
      { title: 'بوابة تذاكر المتاحف والمواقع الأثرية', url: 'https://egymonuments.com', description: 'شراء تذاكر الأهرامات، ومعابد الأقصر وأسوان وقلعة قايتباي' }
    ]
  },
  {
    id: 'suez-canal',
    name: 'Suez Canal Authority',
    arabicName: 'هيئة قناة السويس',
    aliases: [
      'قناة السويس',
      'هيئة قناة السويس',
      'مجرى قناة السويس',
      'suez canal',
      'sca egypt',
    ],
    url: 'https://www.suezcanal.gov.eg',
    category: 'gov',
    categoryLabel: 'مرفق ملاحي عالمي 🚢',
    description: 'أهم ممر ملاحي بحري في العالم يربط بين البحرين الأبيض المتوسط والأحمر، وتديره هيئة قناة السويس المصرية بكفاءة وسيادة وطنية كاملة.',
    verified: true,
    subLinks: [
      { title: 'رسوم وحساب عبور السفن', url: 'https://www.suezcanal.gov.eg/Arabic/Navigation/Pages/TollsCalculator.aspx' },
      { title: 'إحصائيات الملاحة اليومية وحمولات السفن', url: 'https://www.suezcanal.gov.eg/Arabic/Navigation/Pages/NavigationStatistics.aspx' }
    ]
  },
  {
    id: 'dar-al-ifta',
    name: 'Dar Al-Ifta Al-Missriyyah',
    arabicName: 'دار الإفتاء المصرية',
    aliases: [
      'دار الإفتاء',
      'دار الافتاء المصرية',
      'فتاوى دار الإفتاء',
      'مفتي الديار المصرية',
      'dar al ifta',
    ],
    url: 'https://www.dar-alifta.org',
    category: 'culture',
    categoryLabel: 'مرجعية إفتائية إسلامية معتدلة 🕌',
    description: 'المؤسسة الدينية المعتمدة لإصدار الفتاوى الشرعية والرد على استفسارات المسلمين في شؤون العبادات والمعاملات والأحوال الشخصية برؤية منهجية وسيطة تنبذ التشدد.',
    phone: 'الخط الساخن للفتاوى: 107',
    verified: true,
    subLinks: [
      { title: 'طلب فتوى إلكترونية موثقة', url: 'https://www.dar-alifta.org/ar/FatwaRequest', description: 'إرسال سؤال شرعي واستلام الرد الموثق من أمانة الفتوى' },
      { title: 'دليل الفتاوى المكتوبة والأحوال الشخصية', url: 'https://www.dar-alifta.org/ar/fatawa' },
      { title: 'استطلاع أهلة الشهور الهجرية وشهر رمضان', url: 'https://www.dar-alifta.org' }
    ]
  },
  {
    id: 'al-azhar',
    name: 'Al-Azhar Al-Sharif',
    arabicName: 'مشيخة الأزهر الشريف',
    aliases: [
      'الأزهر الشريف',
      'الازهر',
      'جامعة الأزهر',
      'مجمع البحوث الإسلامية',
      'al azhar',
    ],
    url: 'https://www.azhar.eg',
    category: 'culture',
    categoryLabel: 'منارة إسلامية وعلمية عريقة 🕌',
    description: 'أقدم جامعة إسلامية ومؤسسة دينية علمية كبرى في العالم الإسلامي، تأسس عام 972م، ويضم جامعة الأزهر، ومجمع البحوث الإسلامية، والمعاهد الأزهرية بالمحافظات.',
    verified: true,
    subLinks: [
      { title: 'بوابة الأزهر الإلكترونية الرسمية', url: 'https://www.azhar.eg' },
      { title: 'جامعة الأزهر وقطاع الكليات', url: 'https://www.azhar.edu.eg' },
      { title: 'مركز الأزهر العالمي للفتوى الإلكترونية', url: 'https://www.azhar.eg/fatwacenter', description: 'الخط الساخن 19906' }
    ]
  },
  {
    id: 'cairo-university',
    name: 'Cairo University',
    arabicName: 'جامعة القاهرة',
    aliases: [
      'جامعة القاهرة',
      'جامعه القاهره',
      'قصر العيني',
      'كلية الهندسة جامعة القاهرة',
      'cairo university',
    ],
    url: 'https://cu.edu.eg',
    category: 'education',
    categoryLabel: 'أم الجامعات المصرية والعربية 🎓',
    description: 'تأسست عام 1908 كأول جامعة حديثة في مصر والشرق الأوسط، تضم كليات الطب (قصر العيني)، والهندسة، والحقوق، والآداب، والعلوم، والاقتصاد والعلوم السياسية.',
    verified: true,
    subLinks: [
      { title: 'منصة الخدمات الطلابية ونتائج الامتحانات', url: 'https://cu.edu.eg' },
      { title: 'كلية الطب البشري - قصر العيني', url: 'https://kasralainy.cu.edu.eg' },
      { title: 'الدراسات العليا والوافدين', url: 'https://cu.edu.eg' }
    ]
  },
  {
    id: 'nbe-bank',
    name: 'National Bank of Egypt',
    arabicName: 'البنك الأهلي المصري',
    aliases: [
      'البنك الأهلي المصري',
      'البنك الاهلي',
      'شهادات البنك الأهلي',
      'الأهلي نت',
      'nbe',
      'national bank of egypt',
    ],
    url: 'https://www.nbe.com.eg',
    category: 'finance',
    categoryLabel: 'أكبر بنك تجاري في مصر 🏦',
    description: 'أقدم وأكبر البنوك التجارية المصرية، تأسس عام 1898، يقدم خدمات مصرفية متكاملة وشهادات ادخار بالجنيه والدولار، وشبكة صراف آلي وفروع تغطي جميع محافظات مصر.',
    phone: 'الخط الساخن: 19623',
    verified: true,
    subLinks: [
      { title: 'شهادات الادخار وعوائد الاستثمار', url: 'https://www.nbe.com.eg/NBE/E/#/AR/ProductDetails?inParams=%7B%22CategoryID%22%3A%22Certificates%22%7D' },
      { title: 'خدمة الأهلي نت والأهلي موبايل', url: 'https://www.nbe.com.eg' },
      { title: 'أسعار العملات الأجنبية في البنك الأهلي', url: 'https://www.nbe.com.eg' }
    ]
  },
  {
    id: 'banque-misr',
    name: 'Banque Misr',
    arabicName: 'بنك مصر',
    aliases: [
      'بنك مصر',
      'شهادات بنك مصر',
      'بنك مصر اون لاين',
      'طلعت حرب',
      'banque misr',
    ],
    url: 'https://www.banquemisr.com',
    category: 'finance',
    categoryLabel: 'صرح الاقتصاد الوطني المصري 🏦',
    description: 'تأسس عام 1920 على يد الاقتصادي الوطني محمد طلعت حرب باشا، أحد رواد المصارف الوطنية المصرية وداعم رئيسي للمشاريع الوطنية والمشاريع الصغيرة والمتوسطة.',
    phone: 'الخط الساخن: 19888',
    verified: true,
    subLinks: [
      { title: 'أوعية الادخار وشهادات بنك مصر', url: 'https://www.banquemisr.com/ar-eg/personal/saving-and-investing' },
      { title: 'خدمات الإنترنت البنكي (BM Online)', url: 'https://www.banquemisr.com' }
    ]
  },
  {
    id: 'egyptair',
    name: 'EGYPTAIR',
    arabicName: 'مصر للطيران',
    aliases: [
      'مصر للطيران',
      'شركة مصر للطيران',
      'حجز مصر للطيران',
      'رحلات مصر للطيران',
      'egyptair',
    ],
    url: 'https://www.egyptair.com',
    category: 'gov',
    categoryLabel: 'الناقل الوطني لجمهورية مصر العربية ✈️',
    description: 'الناقل الجوي الوطني لجمهورية مصر العربية وعضو تحالف ستار العالمي، تأسست عام 1932 وتعتبر سابع أقدم شركة طيران في العالم وتربط مصر بأكثر من 80 وجهة دولية.',
    phone: 'مركز الاتصالات: 1717 (من المحمول) / 090070000',
    verified: true,
    subLinks: [
      { title: 'حجز وتعديل تذاكر الطيران', url: 'https://www.egyptair.com' },
      { title: 'جدول الرحلات ومواعيد الإقلاع والوصول', url: 'https://www.egyptair.com' },
      { title: 'برنامج المسافر الدائم (مصر للطيران بلس)', url: 'https://www.egyptair.com' }
    ]
  }
];

export function findMatchingEgyptianEntity(query: string): OfficialEntity | null {
  const normalizedQuery = normalizeArabic(query.trim().toLowerCase());
  if (!normalizedQuery) return null;

  for (const entity of OFFICIAL_EGYPTIAN_ENTITIES) {
    // Check direct normalized name
    const normEntityName = normalizeArabic(entity.arabicName.toLowerCase());
    if (normalizedQuery.includes(normEntityName) || normEntityName.includes(normalizedQuery)) {
      return entity;
    }

    // Check aliases
    for (const alias of entity.aliases) {
      const normAlias = normalizeArabic(alias.toLowerCase());
      if (
        normalizedQuery === normAlias ||
        normalizedQuery.includes(normAlias) ||
        normAlias.includes(normalizedQuery)
      ) {
        return entity;
      }
    }
  }

  return null;
}

export function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآء]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '') // strip Harakat
    .replace(/\s+/g, ' ')
    .trim();
}
