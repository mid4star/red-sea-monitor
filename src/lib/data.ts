import { MarineSpecies, ProtectedArea, WildlifeObservation, EnvironmentalIncident, ResearchResource, Opportunity, AuditLogItem } from '../types';

export const INITIAL_SPECIES: MarineSpecies[] = [
  {
    id: 'sp-dugong',
    slug: 'dugong-dugon',
    scientificName: 'Dugong dugon',
    taxonomicGroup: 'Marine Mammals',
    conservationStatus: 'VU',
    statusSource: 'IUCN Red List 2026',
    isLocationSensitive: true,
    commonName: {
      ar: 'الأطوم (عروس البحر)',
      en: 'Dugong (Sea Cow)'
    },
    description: {
      ar: 'ثديي بحري عاشب يتغذى حصرياً على مروج الأعشاب البحرية في الخلجان الضحلة المحمية بالبحر الأحمر.',
      en: 'A strictly herbivorous marine mammal that grazes extensively on coastal seagrass beds in sheltered Red Sea bays.'
    },
    threats: {
      ar: 'اصطدام القوارب السريعة، وشباك الصيد الخيشومية، وتدهور المروج البحرية.',
      en: 'High-speed vessel strikes, gillnet entanglement, and seagrass meadow degradation.'
    },
    conservationMeasures: {
      ar: 'تحديد سرعات المراكب، حظر الإرساء فوق المروج، وبرامج المراقبة بالقمر الصناعي.',
      en: 'Vessel speed restrictions, no-anchor zones, and satellite telemetry monitoring.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-hawksbill',
    slug: 'eretmochelys-imbricata',
    scientificName: 'Eretmochelys imbricata',
    taxonomicGroup: 'Reptiles',
    conservationStatus: 'CR',
    statusSource: 'IUCN Red List 2026',
    isLocationSensitive: true,
    commonName: {
      ar: 'سلحفاة صقرية المنقار',
      en: 'Hawksbill Sea Turtle'
    },
    description: {
      ar: 'سلحفاة بحرية مهددة بشدة بالانقراض تتميز بمنقار حاد وتلعب دوراً حيوياً في حفظ توازن الشعاب المرجانية.',
      en: 'A critically endangered marine turtle essential for reef ecosystem balance by grazing on sponges.'
    },
    threats: {
      ar: 'التعدي على شواطئ التعشيش، التلوث الضوئي، والتجارة غير المشروعة للدرقات.',
      en: 'Nesting beach disturbance, coastal artificial lighting, and plastic ingestion.'
    },
    conservationMeasures: {
      ar: 'حراسة شواطئ الجزر أثناء مواسم وضع البيض، ومكافحة النفايات البلاستيكية.',
      en: 'Island nesting patrols, seasonal night beach closures, and beach cleanup operations.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-whaleshark',
    slug: 'rhincodon-typus',
    scientificName: 'Rhincodon typus',
    taxonomicGroup: 'Elasmobranchs',
    conservationStatus: 'EN',
    statusSource: 'IUCN Red List 2026',
    isLocationSensitive: false,
    commonName: {
      ar: 'القرش الحوت (بهلول)',
      en: 'Whale Shark'
    },
    description: {
      ar: 'أكبر سمكة حية في كوكب الأرض، كائن أليف مسالم يقتات على العوالق البحرية ويعبر البحر الأحمر موسمياً.',
      en: 'The world’s largest fish, a gentle filter-feeder that migrates through Egyptian Red Sea channels.'
    },
    threats: {
      ar: 'اصطدام رفاصات المراكب السياحية، والصيد العرضي بالشباك الضخمة.',
      en: 'Boat propeller trauma, commercial fisheries bycatch, and unmanaged tourism diving.'
    },
    conservationMeasures: {
      ar: 'تطبيق ميثاق السباحة المنظم، وسجل الهوية البصري لزعانف الأفراد.',
      en: 'Photo-identification registry and mandatory 3-meter swimmer distance enforcement.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-napoleon',
    slug: 'cheilinus-undulatus',
    scientificName: 'Cheilinus undulatus',
    taxonomicGroup: 'Fish',
    conservationStatus: 'EN',
    statusSource: 'CITES Appendix II',
    isLocationSensitive: false,
    commonName: {
      ar: 'سمكة نابليون (الطرباني)',
      en: 'Humphead (Napoleon) Wrasse'
    },
    description: {
      ar: 'سمكة عملاقة شهيرة في منحدرات الشعاب المرجانية، تفترس نجم البحر الشوكي السام لتحمي المرجان.',
      en: 'A massive reef fish vital to coral reef health through predation on Crown-of-Thorns starfish.'
    },
    threats: {
      ar: 'الصيد بالرمح غير القانوني وتجارة أسماك الزينة الحية الفاخرة.',
      en: 'Illegal spearfishing and targeted live reef food fish trade.'
    },
    conservationMeasures: {
      ar: 'حظر كامل للصيد والتداول في المياه الإقليمية المصرية مع غرامات مشددة.',
      en: 'Strict national ban on capture, transport and sale under Environmental Law 4/1994.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-giantclam',
    slug: 'tridacna-squamosa',
    scientificName: 'Tridacna squamosa',
    taxonomicGroup: 'Invertebrates',
    conservationStatus: 'VU',
    statusSource: 'IUCN Red List 2026',
    isLocationSensitive: false,
    commonName: {
      ar: 'المحار العملاق (البُصر)',
      en: 'Fluted Giant Clam'
    },
    description: {
      ar: 'رخوي عملاق ملون يعيش متكافلاً مع طحالب الزوزانتلي الدقيقة في الشعاب الضحلة النقية.',
      en: 'A large, vibrant bivalve living symbiotically with photosynthetic zooxanthellae in pristine reefs.'
    },
    threats: {
      ar: 'جمع الأصداف للسياحة والترسيب الناتج عن الإنشاءات الساحلية.',
      en: 'Reef sedimentation, ornamental shell trade, and thermal bleaching events.'
    },
    conservationMeasures: {
      ar: 'تنفيذ بنود اتفاقية سايتس ورصد المستعمرات في المحميات الجنوبية.',
      en: 'Protected under CITES Appendix II and continuous benthic transect monitoring.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_PROTECTED_AREAS: ProtectedArea[] = [
  {
    id: 'pa-ras-mohammed',
    slug: 'ras-mohammed',
    areaType: 'National Park',
    officialDesignation: 'Prime Ministerial Decree 1068/1983',
    designationYear: 1983,
    areaSizeKm2: 480,
    latitude: 27.7289,
    longitude: 34.2492,
    name: {
      ar: 'محمية رأس محمد الوطنية',
      en: 'Ras Mohammed National Park'
    },
    description: {
      ar: 'أول محمية بحرية في مصر عند التقاء خليجي السويس والعقبة، وتضم جدراناً مرجانية عمودية شهيرة وغابات مانجروف.',
      en: 'Egypt’s premier marine national park featuring sheer vertical coral drop-offs and vital mangrove ecosystems.'
    },
    conservationObjectives: {
      ar: 'حماية جدران الشعاب المرجانية العميقة، وقنوات المانجروف، وممرات أسماك القرش.',
      en: 'Protection of pelagic shark corridors, coral drop-offs, and mangrove nursery channels.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pa-wadi-el-gemal',
    slug: 'wadi-el-gemal',
    areaType: 'National Park',
    officialDesignation: 'Prime Ministerial Decree 144/2003',
    designationYear: 2003,
    areaSizeKm2: 7450,
    latitude: 24.6625,
    longitude: 35.0931,
    name: {
      ar: 'محمية وادي الجمال الوطنية',
      en: 'Wadi El Gemal National Park'
    },
    description: {
      ar: 'محمية ساحلية وبرية عملاقة جنوب مرسى علم، تحتضن أكبر مروج أعشاب بحرية وملاذات أطوم البحر وسلاحف خضراء.',
      en: 'A massive coastal and marine biosphere south of Marsa Alam hosting dense seagrass beds and dugong sanctuaries.'
    },
    conservationObjectives: {
      ar: 'الحفاظ على موائل عروس البحر وأماكن تعشيش السلاحف البحرية والتراث البيئي الأصيل.',
      en: 'Conservation of dugong feeding meadows, turtle nesting beaches, and indigenous heritage.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pa-nabq',
    slug: 'nabq-reserve',
    areaType: 'Managed Resource Protected Area',
    officialDesignation: 'Prime Ministerial Decree 1511/1992',
    designationYear: 1992,
    areaSizeKm2: 600,
    latitude: 28.2431,
    longitude: 34.4211,
    name: {
      ar: 'محمية نبق متعددة الأغراض',
      en: 'Nabq Managed Resource Protected Area'
    },
    description: {
      ar: 'تقع على خليج العقبة وتحتوي على الغابة الشجرية الطبيعية الأبعد شمالاً لأشجار الشورى في البحر الأحمر.',
      en: 'Located on the Gulf of Aqaba, housing the northernmost natural mangrove forest in the Red Sea basin.'
    },
    conservationObjectives: {
      ar: 'حماية التنوع الجيني لأشجار القرم والطيور المهاجرة وإدارة الاستخدام التقليدي للموارد.',
      en: 'Preserving mangrove genetic diversity, migratory bird resting points, and sustainable artisanal fishing.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pa-giftun',
    slug: 'giftun-islands',
    areaType: 'Marine Reserve',
    officialDesignation: 'Prime Ministerial Decree 85/1986',
    designationYear: 1986,
    areaSizeKm2: 210,
    latitude: 27.2341,
    longitude: 33.9214,
    name: {
      ar: 'محمية جزر الجفتون البحرية',
      en: 'Giftun Islands Marine Reserve'
    },
    description: {
      ar: 'جزر وشعاب مرجانية خلابة قبالة الغردقة، تشهد تنظيم الغوص السياحي لحماية مواطن الأسماك والشعاب النادرة.',
      en: 'A scenic archipelago and reef complex off Hurghada under eco-tourism management to protect fragile coral habitats.'
    },
    conservationObjectives: {
      ar: 'منع تحطم الشعاب بفعل المراسي، وإرساء الشمندورات الثابتة، والرقابة البيئية للزوار.',
      en: 'Mooring buoy installation, preventing anchor destruction, and managing visitor carrying capacity.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_OBSERVATIONS: WildlifeObservation[] = [
  {
    id: 'obs-01',
    speciesId: 'sp-dugong',
    speciesName: {
      ar: 'الأطوم (عروس البحر)',
      en: 'Dugong dugon'
    },
    protectedAreaId: 'pa-wadi-el-gemal',
    protectedAreaName: {
      ar: 'محمية وادي الجمال',
      en: 'Wadi El Gemal'
    },
    observationType: 'wildlife_sighting',
    observedAt: '2026-10-24T09:30:00Z',
    submittedAt: '2026-10-24T11:15:00Z',
    latitude: 24.6821,
    longitude: 35.0842,
    isLocationGeneralized: true,
    accuracyM: 20,
    countIndividuals: 1,
    confidence: 'certain',
    reviewStatus: 'verified',
    description: 'رصد حيوان أطوم بالغ يرعى في مرج الأعشاب البحرية بعمق 6 أمتار في خليج مرسى عجلة.',
    reporterName: 'Captain Tarek Mansour (Field Ranger)',
    mediaUrls: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 'obs-02',
    speciesId: 'sp-hawksbill',
    speciesName: {
      ar: 'سلحفاة صقرية المنقار',
      en: 'Eretmochelys imbricata'
    },
    protectedAreaId: 'pa-ras-mohammed',
    protectedAreaName: {
      ar: 'محمية رأس محمد',
      en: 'Ras Mohammed'
    },
    observationType: 'wildlife_sighting',
    observedAt: '2026-10-22T14:10:00Z',
    submittedAt: '2026-10-22T15:00:00Z',
    latitude: 27.7314,
    longitude: 34.2561,
    isLocationGeneralized: true,
    accuracyM: 15,
    countIndividuals: 1,
    confidence: 'certain',
    reviewStatus: 'verified',
    description: 'سلحفاة يافعة بصحة ممتازة تتغذى على الإسفنج بجدار شارك ريف.',
    reporterName: 'Sara El-Sayed (Marine Biologist)',
    mediaUrls: ['https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 'obs-03',
    speciesId: 'sp-whaleshark',
    speciesName: {
      ar: 'القرش الحوت',
      en: 'Rhincodon typus'
    },
    protectedAreaId: 'pa-giftun',
    protectedAreaName: {
      ar: 'محمية جزر الجفتون',
      en: 'Giftun Islands'
    },
    observationType: 'wildlife_sighting',
    observedAt: '2026-10-18T10:00:00Z',
    submittedAt: '2026-10-18T12:00:00Z',
    latitude: 27.2415,
    longitude: 33.9182,
    isLocationGeneralized: false,
    accuracyM: 30,
    countIndividuals: 1,
    confidence: 'certain',
    reviewStatus: 'verified',
    description: 'قرش حوت يقدر طوله بـ 6 أمتار يسبح ببطء نحو الشمال بمحاذاة جزيرة الجفتون الصغير.',
    reporterName: 'Dive Master Ahmed Zaki',
    mediaUrls: ['https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 'obs-04',
    speciesId: 'sp-napoleon',
    speciesName: {
      ar: 'سمكة نابليون',
      en: 'Cheilinus undulatus'
    },
    protectedAreaId: 'pa-ras-mohammed',
    protectedAreaName: {
      ar: 'محمية رأس محمد',
      en: 'Ras Mohammed'
    },
    observationType: 'wildlife_sighting',
    observedAt: '2026-10-25T16:20:00Z',
    submittedAt: '2026-10-25T17:00:00Z',
    latitude: 27.7289,
    longitude: 34.2492,
    isLocationGeneralized: false,
    accuracyM: 10,
    countIndividuals: 2,
    confidence: 'certain',
    reviewStatus: 'pending',
    description: 'زوج من أسماك نابليون البالغة عند نقطة يولندا ريف بحجم يقارب 1.8 متر.',
    reporterName: 'Kareem Fahmy (Eco-Diver)'
  }
];

export const INITIAL_INCIDENTS: EnvironmentalIncident[] = [
  {
    id: 'inc-01',
    incidentType: 'oil_spill',
    severity: 'medium',
    observedAt: '2026-10-23T08:15:00Z',
    latitude: 27.9123,
    longitude: 33.6421,
    locationDescription: 'شمال خليج السويس بالقرب من مسار ملاحي للمراكب التجارية',
    description: 'بقعة زيت رقيقة تمتد لحوالي 200 متر ناجمة عن تسريب مياه توازن من سفينة بضائع.',
    reviewStatus: 'investigating',
    reporterName: 'Coastal Patrol Unit 4'
  },
  {
    id: 'inc-02',
    incidentType: 'anchor_damage',
    severity: 'high',
    observedAt: '2026-10-20T11:45:00Z',
    latitude: 27.2281,
    longitude: 33.9142,
    locationDescription: 'الشعاب المحيطة بجزيرة الجفتون الكبير',
    description: 'يخت سياحي ألقى المخطاف مباشرة فوق مستعمرة شعاب متفرعة من نوع أكروبورا مما تسبب في كسر مساحة 4 أمتار.',
    reviewStatus: 'action_taken',
    reporterName: 'Ranger Mahmoud Kamal'
  }
];

export const INITIAL_RESEARCH: ResearchResource[] = [
  {
    id: 'res-01',
    slug: 'red-sea-coral-thermal-resilience',
    resourceType: 'peer_reviewed_paper',
    publicationDate: '2025-06-15',
    doi: '10.1038/s41558-025-02100-x',
    institution: 'National Institute of Oceanography and Fisheries (NIOF)',
    title: {
      ar: 'المرونة الوراثية والحرارية لشعاب شمال البحر الأحمر المرجانية في مواجهة موجات الحر',
      en: 'Genetic and Thermal Resilience of Northern Red Sea Scleractinian Corals Under Heatwaves'
    },
    abstract: {
      ar: 'دراسة علمية موثقة ترصد الخصائص التطورية لشعاب شمال البحر الأحمر وقدرتها على البقاء كملجأ مرجاني عالمي مقاوم لارتفاع حرارة المحيطات.',
      en: 'A comprehensive study documenting the evolutionary thermal threshold of northern Red Sea corals displaying minimal bleaching under sustained heat stress.'
    },
    keywords: ['Coral Bleaching', 'Thermal Resilience', 'Marine Sanctuary', 'Genomics']
  },
  {
    id: 'res-02',
    slug: 'dugong-population-survey-egypt',
    resourceType: 'technical_report',
    publicationDate: '2024-11-20',
    doi: '10.1016/j.ocecoaman.2024.107200',
    institution: 'Red Sea Protected Areas Sector (EEAA)',
    title: {
      ar: 'التعداد الساحلي والجوي عبر الطائرات المسيرة لمجموعات الأطوم بجنوب البحر الأحمر المصري',
      en: 'Aerial and Coastal Drone Census of Dugong (Dugong dugon) Populations Across Southern Egyptian Red Sea'
    },
    abstract: {
      ar: 'مسح تصويري منتظم شمل 24 خليجاً بين القصير وحماطة لتقدير كثافة عروس البحر وتحديد موائل الحضانة والتغذية الحيوية ومسارات حركتها.',
      en: 'Systematic drone surveys covering 24 shallow bays between El Quseir and Hamata to estimate resident dugong density and critical nursery habitats.'
    },
    keywords: ['Dugong dugon', 'Drone Census', 'Seagrass Mapping', 'Marsa Alam']
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-01',
    slug: 'red-sea-dugong-telemetry-fellowship',
    opportunityType: 'grant',
    organizer: 'Red Sea Conservation Fund & NIOF',
    locationText: 'Marsa Alam & Hurghada, Egypt',
    deadline: '2026-12-01',
    applicationUrl: 'https://redseamonitor.org/grants/dugong-2026',
    title: {
      ar: 'منحة أبحاث تتبع حركة عروس البحر عبر الأقمار الصناعية 2026',
      en: '2026 Red Sea Dugong Satellite Telemetry Research Fellowship'
    },
    description: {
      ar: 'منحة بحثية ممولة لعلماء الأحياء البحرية الشباب لتطبيق أجهزة التتبع الآمن على مجموعات الأطوم وتوثيق مسارات التغذية.',
      en: 'Fully funded research grant for young marine biologists to deploy non-invasive satellite trackers and map foraging corridors.'
    },
    eligibility: {
      ar: 'حملة الماجستير أو الدكتوراه في علوم البحار أو البيئة مع خبرة غوص علمي معتمدة.',
      en: 'MSc or PhD candidates in marine biology or oceanography with certified scientific diving credentials.'
    },
    status: 'open'
  },
  {
    id: 'opp-02',
    slug: 'volunteer-reef-sentinel-2026',
    opportunityType: 'volunteering',
    organizer: 'Egyptian Environmental Affairs Agency (EEAA)',
    locationText: 'South Sinai & Red Sea Protected Areas',
    deadline: '2026-11-15',
    applicationUrl: 'https://redseamonitor.org/volunteer/sentinels',
    title: {
      ar: 'برنامج حراس الشعاب: رصد وتوثيق المرجان بالتعاون مع المجتمع المحلي',
      en: 'Reef Sentinels Volunteer Program: Community Coral Health Monitoring'
    },
    description: {
      ar: 'مبادرة تدريب وتطوع للغواصين والمجتمعات البدوية والساحلية لرفع كفاءة الرصد المبكر لابيضاض المرجان والإبلاغ السريع.',
      en: 'Training and volunteering campaign empowering certified divers and local coastal communities for early coral bleaching detection.'
    },
    eligibility: {
      ar: 'رخصة غوص مياه مفتوحة متقدمة (Advanced Open Water) أو انتماء لمجتمع ساحلي محلي بالبحر الأحمر.',
      en: 'Advanced Open Water diving certification or resident of Red Sea coastal communities.'
    },
    status: 'open'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-01',
    actorName: 'Dr. Mostafa Layaq (Super Admin)',
    action: 'VERIFY_OBSERVATION',
    entityType: 'observations',
    entityId: 'obs-01',
    timestamp: '2026-10-24 12:30:15',
    details: 'Verified Dugong observation at Marsa Egla after cross-checking photographic evidence.'
  },
  {
    id: 'log-02',
    actorName: 'Sara El-Sayed (Moderator)',
    action: 'VERIFY_OBSERVATION',
    entityType: 'observations',
    entityId: 'obs-02',
    timestamp: '2026-10-22 15:30:00',
    details: 'Approved Hawksbill Turtle foraging sighting at Shark Reef.'
  },
  {
    id: 'log-03',
    actorName: 'Captain Tarek Mansour (Field Ranger)',
    action: 'DISPATCH_INCIDENT_INVESTIGATION',
    entityType: 'environmental_incidents',
    entityId: 'inc-02',
    timestamp: '2026-10-20 14:00:22',
    details: 'Issued environmental violation penalty for anchor damage at Giftun marine reserve.'
  }
];
