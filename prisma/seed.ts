import { PrismaClient, UserRole, ArticleType, ContentStatus, PlaceType, SpeciesGroup, IucnStatus, ObservationType, SightingStatus, LibraryItemType, OpportunityKind, OrganizationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Red Sea Monitor Seed Process (is_demo = true)...');

  // 1. Seed Users & Public Author Profiles
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@redseamonitor.org' },
    update: {},
    create: {
      id: 'usr-admin-01',
      name: 'Dr. Tariq El-Gamil',
      email: 'admin@redseamonitor.org',
      password_hash: '$2b$12$e8YxPZ9z7eFz7k/Q7x8wqe3yJ7h5/T7k2lX3mZ9y0wqe3yJ7h5/T7', // sample hash
      role: UserRole.ADMIN,
      bio: 'Senior marine ecologist and remote-sensing specialist with 22 years of Egyptian Red Sea transect monitoring.',
      organization: 'Red Sea Marine Conservation Initiative',
      is_active: true,
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@redseamonitor.org' },
    update: {},
    create: {
      id: 'usr-editor-01',
      name: 'Layla Mansour',
      email: 'editor@redseamonitor.org',
      password_hash: '$2b$12$e8YxPZ9z7eFz7k/Q7x8wqe3yJ7h5/T7k2lX3mZ9y0wqe3yJ7h5/T7',
      role: UserRole.EDITOR,
      bio: 'Environmental investigative journalist documenting artisanal fishing communities and coastal land use.',
      organization: 'Red Sea Monitor Editorial Board',
      is_active: true,
    },
  });

  const reviewerUser = await prisma.user.upsert({
    where: { email: 'reviewer@redseamonitor.org' },
    update: {},
    create: {
      id: 'usr-reviewer-01',
      name: 'Prof. Karim Zidan',
      email: 'reviewer@redseamonitor.org',
      password_hash: '$2b$12$e8YxPZ9z7eFz7k/Q7x8wqe3yJ7h5/T7k2lX3mZ9y0wqe3yJ7h5/T7',
      role: UserRole.REVIEWER,
      bio: 'Chief Scientist at NIOF Hurghada branch specializing in elasmobranch and marine mammal bioacoustics.',
      organization: 'National Institute of Oceanography and Fisheries (NIOF)',
      is_active: true,
    },
  });

  await prisma.author.upsert({
    where: { slug: 'tariq-el-gamil' },
    update: {},
    create: {
      user_id: adminUser.id,
      display_name: 'Dr. Tariq El-Gamil',
      slug: 'tariq-el-gamil',
      bio: 'Specialist in Northern Red Sea coral thermal tolerance mechanisms.',
      is_demo: true,
    },
  });

  await prisma.author.upsert({
    where: { slug: 'layla-mansour' },
    update: {},
    create: {
      user_id: editorUser.id,
      display_name: 'Layla Mansour',
      slug: 'layla-mansour',
      bio: 'Investigative environmental journalist covering protected areas decrees and conservation.',
      is_demo: true,
    },
  });

  // 2. Seed Topics
  const topicCoral = await prisma.topic.upsert({
    where: { slug: 'coral-reefs' },
    update: {},
    create: { slug: 'coral-reefs', name: 'Coral Reefs & Thermal Refugia', is_demo: true },
  });

  const topicTurtles = await prisma.topic.upsert({
    where: { slug: 'sea-turtles' },
    update: {},
    create: { slug: 'sea-turtles', name: 'Marine Turtles & Nesting', is_demo: true },
  });

  const topicProtected = await prisma.topic.upsert({
    where: { slug: 'protected-areas' },
    update: {},
    create: { slug: 'protected-areas', name: 'Protected Areas & Governance', is_demo: true },
  });

  const topicHeritage = await prisma.topic.upsert({
    where: { slug: 'heritage' },
    update: {},
    create: { slug: 'heritage', name: 'Desert & Fishing Heritage', is_demo: true },
  });

  // 3. Seed Places (6 Places)
  const placesData = [
    {
      slug: 'ras-mohammed-national-park',
      name: 'Ras Mohammed National Park',
      type: PlaceType.PROTECTED_AREA,
      summary: 'Egypt’s premier marine sanctuary at the apex of the Sinai Peninsula where the Gulf of Suez meets the Gulf of Aqaba.',
      latitude: 27.7289,
      longitude: 34.2541,
      protection_status: 'National Park (IUCN Category II)',
      established_year: 1983,
      area_km2: 480.0,
      is_demo: true,
    },
    {
      slug: 'wadi-el-gemal-hamata',
      name: 'Wadi El Gemal – Hamata',
      type: PlaceType.PROTECTED_AREA,
      summary: 'Vast terrestrial and marine park encompassing intact coastal mangroves, seagrass foraging corridors for dugongs, and prehistoric Eastern Desert wadis.',
      latitude: 24.693,
      longitude: 35.088,
      protection_status: 'National Park (IUCN Category II)',
      established_year: 2003,
      area_km2: 7450.0,
      is_demo: true,
    },
    {
      slug: 'elphinstone-reef',
      name: 'Elphinstone Reef (Sha’ab Shehr)',
      type: PlaceType.REEF,
      summary: 'Offshore oceanic pinnacle famous for sheer walls dropping past 100 meters, strong pelagic currents, and oceanic whitetip shark aggregations.',
      latitude: 25.3167,
      longitude: 34.8667,
      protection_status: 'Managed Dive Reserve',
      established_year: 1998,
      area_km2: 12.5,
      is_demo: true,
    },
    {
      slug: 'marsa-alam-coastal-basin',
      name: 'Marsa Alam Coastal Sector',
      type: PlaceType.COASTAL_TOWN,
      summary: 'Southern coastal hub characterized by natural sheltered bays (marsas) and extensive fringe reef complexes.',
      latitude: 25.0667,
      longitude: 34.8833,
      protection_status: 'Municipal Coastal Zone',
      established_year: 1995,
      area_km2: 150.0,
      is_demo: true,
    },
    {
      slug: 'hurghada-marine-islands',
      name: 'Giftun Islands Protected Area (Hurghada)',
      type: PlaceType.ISLAND,
      summary: 'Offshore islands supporting vital breeding colonies of white-eyed gulls (*Ichthyaetus leucophthalmus*) and shallow fringing coral gardens.',
      latitude: 27.2333,
      longitude: 33.9167,
      protection_status: 'Marine Protected Area',
      established_year: 1986,
      area_km2: 110.0,
      is_demo: true,
    },
    {
      slug: 'wadi-el-hitan-heritage-reference',
      name: 'Wadi El Hitan (Whale Valley Reference)',
      type: PlaceType.HERITAGE_SITE,
      summary: 'UNESCO World Heritage reference site revealing the evolutionary transition of early archaeocete whales (*Basilosaurus*) in Egypt’s ancient Tethys ocean.',
      latitude: 29.2667,
      longitude: 30.0417,
      protection_status: 'UNESCO World Heritage Site',
      established_year: 2005,
      area_km2: 200.0,
      is_demo: true,
    },
  ];

  for (const place of placesData) {
    await prisma.place.upsert({
      where: { slug: place.slug },
      update: {},
      create: place,
    });
  }

  // 4. Seed Species (8 Species)
  const speciesData = [
    {
      slug: 'hawksbill-sea-turtle',
      common_name: 'Hawksbill Sea Turtle',
      scientific_name: 'Eretmochelys imbricata',
      group: SpeciesGroup.REPTILE,
      iucn_status: IucnStatus.CR,
      description: 'Critically endangered sponge-feeding specialist frequenting deep wall drop-offs and island fringing reefs.',
      habitat: 'Coral reef drop-offs, crevices, and outer walls',
      threats: 'Plastic entanglement, illegal trade in tortoiseshell, boat strikes',
      is_sensitive: true, // Hide precise public location
      is_demo: true,
    },
    {
      slug: 'green-sea-turtle',
      common_name: 'Green Sea Turtle',
      scientific_name: 'Chelonia mydas',
      group: SpeciesGroup.REPTILE,
      iucn_status: IucnStatus.EN,
      description: 'Herbivorous sea turtle nesting on offshore sandbars and foraging extensively in coastal seagrass meadows.',
      habitat: 'Shallow seagrass beds and sandy nesting coves',
      threats: 'Coastal development, artificial lighting near nesting beaches',
      is_sensitive: true,
      is_demo: true,
    },
    {
      slug: 'dugong',
      common_name: 'Dugong (Sea Cow)',
      scientific_name: 'Dugong dugon',
      group: SpeciesGroup.MAMMAL,
      iucn_status: IucnStatus.VU,
      description: 'Sirenean mammal completely dependent on sheltered coastal meadows of Halophila seagrass.',
      habitat: 'Sheltered bays, marsas, and shallow seagrass flats',
      threats: 'High-speed speedboats, gillnet bycatch, habitat fragmentation',
      is_sensitive: true,
      is_demo: true,
    },
    {
      slug: 'spinner-dolphin',
      common_name: 'Spinner Dolphin',
      scientific_name: 'Stenella longirostris',
      group: SpeciesGroup.MAMMAL,
      iucn_status: IucnStatus.LC,
      description: 'Pelagic cetacean using calm reef lagoons (such as Samadai / Dolphin House) for daylight rest and nursing.',
      habitat: 'Offshore atoll lagoons and oceanic surface waters',
      threats: 'Unregulated dolphin-swim tourist pressure and acoustic disturbance',
      is_sensitive: false,
      is_demo: true,
    },
    {
      slug: 'osprey',
      common_name: 'Western Osprey',
      scientific_name: 'Pandion haliaetus',
      group: SpeciesGroup.BIRD,
      iucn_status: IucnStatus.LC,
      description: 'Specialized fish-eating raptor nesting on undisturbed desert cliffs, mangrove stands, and navigational buoys.',
      habitat: 'Rocky sea cliffs, barrier islands, and coastal desert wadis',
      threats: 'Human encroachment on nesting sites, plastic twine ingestion',
      is_sensitive: false,
      is_demo: true,
    },
    {
      slug: 'red-sea-clownfish',
      common_name: 'Red Sea Clownfish',
      scientific_name: 'Amphiprion bicinctus',
      group: SpeciesGroup.FISH,
      iucn_status: IucnStatus.LC,
      description: 'Two-banded anemonefish endemic to the Red Sea and Gulf of Aden living symbiotically with sea anemones.',
      habitat: 'Fringing and patch reefs between 1m and 30m depth',
      threats: 'Aquarium collection, loss of sea anemone hosts during bleaching',
      is_sensitive: false,
      is_demo: true,
    },
    {
      slug: 'staghorn-coral',
      common_name: 'Staghorn Coral',
      scientific_name: 'Acropora cervicornis',
      group: SpeciesGroup.CORAL,
      iucn_status: IucnStatus.CR,
      description: 'Branching stony coral providing essential architecture and juvenile fish habitat on upper reef slopes.',
      habitat: 'Upper fore-reef slopes with high water circulation',
      threats: 'Crown-of-thorns starfish predation, anchor damage, sedimentation',
      is_sensitive: false,
      is_demo: true,
    },
    {
      slug: 'whale-shark',
      common_name: 'Whale Shark',
      scientific_name: 'Rhincodon typus',
      group: SpeciesGroup.FISH,
      iucn_status: IucnStatus.EN,
      description: 'The world’s largest fish, a docile filter feeder migrating through the Red Sea following plankton blooms.',
      habitat: 'Pelagic open sea, upwelling zones, and oceanic drop-offs',
      threats: 'Propeller strikes, entanglement in offshore commercial longlines',
      is_sensitive: true,
      is_demo: true,
    },
  ];

  for (const sp of speciesData) {
    await prisma.species.upsert({
      where: { slug: sp.slug },
      update: {},
      create: sp,
    });
  }

  // 5. Seed Field Routes (3 Routes)
  const routesData = [
    {
      slug: 'hamata-mangrove-and-dugong-transect',
      title: 'Hamata Mangrove to Marsa Nayzak Coastal Transect',
      summary: 'A 48-kilometer ecological transect tracing southern fringing reefs, coastal Avicennia marina stands, and dugong feeding bays.',
      difficulty: 'Easy',
      duration_hours: 6.0,
      distance_km: 48.0,
      season: 'October – April',
      safety_notes: 'Carry minimum 4L drinking water per person. Strictly no off-trail vehicle driving in wadi deltas.',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
    {
      slug: 'elphinstone-daedalus-oceanic-expedition',
      title: 'Deep Oceanic Pinnacle Liveaboard Route',
      summary: 'Offshore expedition exploring high-energy current walls at Elphinstone and the isolated Daedalus reef lighthouse.',
      difficulty: 'Demanding',
      duration_hours: 72.0,
      distance_km: 190.0,
      season: 'April – June & September – November',
      safety_notes: 'Advanced Open Water + minimum 50 logged drift dives required. Surface Marker Buoy (SMB) mandatory.',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
    {
      slug: 'mons-smaragdus-ancient-emerald-trail',
      title: 'Mons Smaragdus Prehistoric Roman Emerald Trail',
      summary: 'Desert archaeological route ascending from coastal Marsa Nakari through Wadi Gemal to the ancient Roman mining settlements.',
      difficulty: 'Moderate',
      duration_hours: 8.0,
      distance_km: 35.0,
      season: 'November – February',
      safety_notes: '4WD vehicle with satellite beacon or certified Ababda Bedouin guide required. Border patrol permits necessary.',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
  ];

  for (const r of routesData) {
    await prisma.route.upsert({
      where: { slug: r.slug },
      update: {},
      create: r,
    });
  }

  // 6. Seed Library Items (6 Items)
  const libraryData = [
    {
      slug: 'coral-thermal-tolerance-gulf-aqaba-fine-2013',
      type: LibraryItemType.PAPER,
      title: 'Coral reefs of the Red Sea: High tolerance to thermal stress in the Gulf of Aqaba',
      authors_text: 'Fine, M., Gildor, H., & Genin, A.',
      year: 2013,
      publisher: 'Global Change Biology',
      doi: '10.1111/gcb.12198',
      abstract: 'Investigates the physiological and genetic mechanisms conferring extraordinary thermal resilience on northern Red Sea hermatypic corals.',
      is_open_access: true,
      is_demo: true,
    },
    {
      slug: 'dugong-dugon-red-sea-aerial-surveys-shawky-2018',
      type: LibraryItemType.REPORT,
      title: 'Spatial Distribution and Abundance of Dugong dugon along the Egyptian Red Sea Coast',
      authors_text: 'Shawky, A. M., & Marshall, C. D.',
      year: 2018,
      publisher: 'Marine Mammal Science / NIOF Technical Report',
      doi: '10.1111/mms.12490',
      abstract: 'Systematic aerial and vessel transect data identifying critical conservation bays between El-Quseir and the Sudanese border.',
      is_open_access: true,
      is_demo: true,
    },
    {
      slug: 'fishes-of-the-red-sea-randall-1992',
      type: LibraryItemType.BOOK,
      title: 'Red Sea Reef Fishes: Comprehensive Taxonomic Guide',
      authors_text: 'Randall, J. E.',
      year: 1992,
      publisher: 'Immel Publishing, London',
      isbn: '978-0907151876',
      abstract: 'Definitive reference cataloging 325 teleost and elasmobranch taxa of the Red Sea basin with morphological keys and distribution notes.',
      is_open_access: false,
      is_demo: true,
    },
    {
      slug: 'eastern-desert-wadi-el-gemal-archaeology-sidebotham-2008',
      type: LibraryItemType.BOOK,
      title: 'The Red Land: The Illustrated Archaeology of Egypt’s Eastern Desert',
      authors_text: 'Sidebotham, S. E., Hense, M., & Nouwens, H. M.',
      year: 2008,
      publisher: 'American University in Cairo Press',
      isbn: '978-9774160943',
      abstract: 'Examines 4,000 years of mining, trade corridors, and nomadic Ababda habitation across the Eastern Desert wadis.',
      is_open_access: false,
      is_demo: true,
    },
    {
      slug: 'bathymetric-chart-gulf-of-suez-and-red-sea-1984',
      type: LibraryItemType.MAP,
      title: 'Geological and Bathymetric Chart of the Northern Red Sea and Straits of Jubal',
      authors_text: 'Egyptian General Petroleum Corporation & NIOF',
      year: 1984,
      publisher: 'Cairo Survey Authority',
      abstract: 'High-resolution bathymetric contours depicting subsurface grabens, reef ridges, and navigational shoals.',
      is_open_access: true,
      is_demo: true,
    },
    {
      slug: 'marine-turtle-nesting-beaches-zabargad-island-2021',
      type: LibraryItemType.DATASET,
      title: 'Green Turtle Nesting Density Time-Series (Zabargad Island: 2005–2020)',
      authors_text: 'EEAA Nature Conservation Sector Marine Unit',
      year: 2021,
      publisher: 'Red Sea Protected Areas Open Data Repository',
      doi: '10.5281/zenodo.4891234',
      abstract: 'Annual count of egg clutches, false crawls, and estimated hatchling emergence success on Zabargad Island.',
      is_open_access: true,
      is_demo: true,
    },
  ];

  for (const item of libraryData) {
    await prisma.libraryItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  // 7. Seed Organizations & Opportunities (4 Opportunities + 2 Volunteer Programs)
  const niofOrg = await prisma.organization.upsert({
    where: { slug: 'niof-egypt' },
    update: {},
    create: {
      slug: 'niof-egypt',
      name: 'National Institute of Oceanography and Fisheries (NIOF)',
      type: OrganizationType.GOVERNMENT,
      website: 'https://niof.sci.eg',
      description: 'Egypt’s national oceanographic scientific authority founded in 1918 with marine stations in Hurghada and Suez.',
      country: 'Egypt',
      is_demo: true,
    },
  });

  const eeaaOrg = await prisma.organization.upsert({
    where: { slug: 'eeaa-nature-conservation' },
    update: {},
    create: {
      slug: 'eeaa-nature-conservation',
      name: 'Nature Conservation Sector (EEAA)',
      type: OrganizationType.GOVERNMENT,
      website: 'https://www.eeaa.gov.eg',
      description: 'Ministry of Environment department overseeing national parks and marine protected areas.',
      country: 'Egypt',
      is_demo: true,
    },
  });

  const oppsData = [
    {
      slug: 'coral-genetic-resiliency-grant',
      title: 'Red Sea Coral Genetic Resiliency Research Fellowship 2026/27',
      kind: OpportunityKind.FELLOWSHIP,
      summary: 'Postdoctoral research fellowship funding genomic sequencing of northern Red Sea corals displaying elevated thermal thresholds.',
      organization_id: niofOrg.id,
      eligibility: 'PhD in Marine Biology, Molecular Ecology, or Environmental Sciences obtained within last 5 years.',
      amount_text: '$45,000 USD stipend + fully funded research vessel time',
      location_text: 'Hurghada Field Station & Ras Mohammed',
      deadline_at: new Date('2026-11-15T23:59:59Z'),
      apply_url: 'https://niof.sci.eg/fellowships/redsea-coral-2026',
      status: ContentStatus.PUBLISHED,
      is_featured: true,
      is_demo: true,
    },
    {
      slug: 'marine-ranger-spatial-gis-residency',
      title: 'Marine Ranger Spatial GIS & Seagrass Monitoring Residency',
      kind: OpportunityKind.TRAINING,
      summary: 'Comprehensive hands-on training program in drone photogrammetry and QGIS spatial modeling of coastal seagrass meadows.',
      organization_id: eeaaOrg.id,
      eligibility: 'Egyptian university graduates with degree in Geography, Ecology, or Forestry.',
      amount_text: 'Fully Funded (Housing, equipment, and field allowance provided)',
      location_text: 'Wadi El Gemal Field Headquarters',
      deadline_at: new Date('2026-12-01T23:59:59Z'),
      apply_url: 'https://eeaa.gov.eg/training/gis-rangers-2026',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
    {
      slug: 'community-fisheries-heritage-grant',
      title: 'Red Sea Artisanal Fisheries Oral History Documentation Grant',
      kind: OpportunityKind.GRANT,
      summary: 'Small grants supporting ethnographic documentation of traditional Bedouin fishing wisdom, celestial navigation, and local ecological knowledge.',
      organization_id: niofOrg.id,
      eligibility: 'Independent researchers, journalists, or community cultural organizations in Egypt.',
      amount_text: '75,000 EGP per project',
      location_text: 'Red Sea Governorate Coast',
      deadline_at: new Date('2026-11-30T23:59:59Z'),
      apply_url: 'https://redseamonitor.org/grants/oral-histories',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
    {
      slug: 'shark-conservation-field-officer-job',
      title: 'Field Officer: Elasmobranch Telemetry & Bycatch Mitigation',
      kind: OpportunityKind.JOB,
      summary: 'Full-time field position managing satellite pop-up tag deployment on pelagic oceanic sharks and engaging with commercial longline fleets.',
      organization_id: eeaaOrg.id,
      eligibility: 'Master’s degree in Fisheries or Marine Biology + certified Rescue Diver.',
      amount_text: 'Competitive monthly institutional salary + field hazard compensation',
      location_text: 'Marsa Alam / Port Ghalib',
      deadline_at: new Date('2026-12-15T23:59:59Z'),
      apply_url: 'https://eeaa.gov.eg/careers/elasmobranch-officer',
      status: ContentStatus.PUBLISHED,
      is_demo: true,
    },
  ];

  for (const opp of oppsData) {
    await prisma.opportunity.upsert({
      where: { slug: opp.slug },
      update: {},
      create: opp,
    });
  }

  // Volunteer programs (2 Programs)
  await prisma.volunteerProgram.upsert({
    where: { slug: 'turtle-nesting-monitoring-patrol-hamata' },
    update: {},
    create: {
      slug: 'turtle-nesting-monitoring-patrol-hamata',
      title: 'Hamata & Wadi El Gemal Marine Turtle Night Patrol',
      summary: 'Assist rangers in dawn and nocturnal beach surveys, identifying turtle tracks, recording clutch coordinates, and screening nests from feral predators.',
      organization_id: eeaaOrg.id,
      location_text: 'Wadi El Gemal National Park',
      latitude: 24.693,
      longitude: 35.088,
      skills_needed: 'Physical fitness for beach walking, field notebook discipline, red light discipline.',
      safety_notes: 'Accompanied by licensed rangers at all times. Desert night temperatures can drop sharply.',
      spots: 8,
      status: ContentStatus.PUBLISHED,
      apply_url: 'https://eeaa.gov.eg/volunteers/turtle-hamata',
      is_demo: true,
    },
  });

  await prisma.volunteerProgram.upsert({
    where: { slug: 'red-sea-reef-clean-ghost-net-retrieval' },
    update: {},
    create: {
      slug: 'red-sea-reef-clean-ghost-net-retrieval',
      title: 'Hurghada Northern Islands Abandoned Gear Retrieval Dive Squad',
      summary: 'Certified volunteer scuba divers teamed with commercial dive boats to safely excise snagged nylon monofilament nets from shallow pinnacle reefs.',
      organization_id: niofOrg.id,
      location_text: 'Hurghada / Sha’ab Abu Nuhas',
      latitude: 27.2333,
      longitude: 33.9167,
      skills_needed: 'Minimum PADI Advanced Open Water or CMAS 2-star + 40 logged dives.',
      safety_notes: 'Cutting line underwater carries entanglement hazards; shears and lift bags provided.',
      spots: 12,
      status: ContentStatus.PUBLISHED,
      apply_url: 'https://niof.sci.eg/volunteers/reef-clean-2026',
      is_demo: true,
    },
  });

  // 8. Seed Articles (5 Articles)
  const articlesData = [
    {
      slug: 'coral-resilience-gulf-aqaba-super-reefs',
      title: 'Inside the Thermal Refugia: Why Northern Red Sea Corals Resist Global Bleaching',
      dek: 'While global reef systems endure catastrophic bleaching events, scientific surveys between Ras Mohammed and the Straits of Tiran show historic thermo-tolerance. Researchers are decoding their genetic evolutionary advantage.',
      body: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Along the sheer underwater cliffs of the Sinai Peninsula, water temperatures in July regularly surpass 30°C. Yet unlike Australia’s Great Barrier Reef or the Caribbean, the branching Stylophora and Porites corals retain their vibrant olive and copper hues without signs of bleaching.',
              },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'The Evolutionary Thermal Sill Filter' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'The leading scientific explanation points to the paleoclimatic history of the Red Sea basin. During the last glacial maximum, the shallow sill at Bab el-Mandeb constricted water exchange with the Indian Ocean, elevating salinity and surface water temperatures to extreme levels.',
              },
            ],
          },
        ],
      },
      type: ArticleType.FEATURE,
      status: ContentStatus.PUBLISHED,
      published_at: new Date('2026-10-24T09:00:00Z'),
      is_featured: true,
      reading_minutes: 7,
      verified_by_user_id: adminUser.id,
      last_verified_at: new Date('2026-10-24T09:00:00Z'),
      is_demo: true,
    },
    {
      slug: 'dugong-population-surveys-wadi-el-gemal',
      title: 'Acoustic Tracking Confirms Resilient Dugong Grazing Corridors in Hamata',
      dek: 'Hydrophone arrays positioned in sheltered seagrass meadows reveal persistent foraging behaviors among resident dugong populations.',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Passive acoustic monitoring logged over 420 feeding vocalizations...' }] }] },
      type: ArticleType.FIELD_NOTE,
      status: ContentStatus.PUBLISHED,
      published_at: new Date('2026-10-22T14:30:00Z'),
      reading_minutes: 4,
      verified_by_user_id: reviewerUser.id,
      last_verified_at: new Date('2026-10-22T14:30:00Z'),
      is_demo: true,
    },
    {
      slug: 'artisanal-ababbda-fisheries-eastern-desert',
      title: 'Wadi El Gemal: Oral Histories of the Ababda Maritime Wayfarers',
      dek: 'Documenting indigenous navigation, seasonal winds, and sustainable net-casting traditions before modern port expansion.',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Elder fishermen of the Ababda tribe navigate without compass...' }] }] },
      type: ArticleType.INTERVIEW,
      status: ContentStatus.PUBLISHED,
      published_at: new Date('2026-10-18T11:15:00Z'),
      reading_minutes: 5,
      verified_by_user_id: editorUser.id,
      last_verified_at: new Date('2026-10-18T11:15:00Z'),
      is_demo: true,
    },
    {
      slug: 'microplastics-assessment-red-sea-currents',
      title: 'Hydrodynamic Gyres and Floating Polymer Density in the Northern Red Sea',
      dek: 'A joint survey by NIOF quantifies microplastic concentrations along surface oceanic fronts.',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Surface manta trawl samples collected across 18 offshore stations...' }] }] },
      type: ArticleType.NEWS,
      status: ContentStatus.PUBLISHED,
      published_at: new Date('2026-10-12T08:00:00Z'),
      reading_minutes: 3,
      verified_by_user_id: adminUser.id,
      last_verified_at: new Date('2026-10-12T08:00:00Z'),
      is_demo: true,
    },
    {
      slug: 'sharks-elphinstone-behavioral-changes-tourism',
      title: 'Oceanic Whitetip Shark Residency and Diver Proximity at Elphinstone',
      dek: 'Telemetry data shows altered vertical migration patterns when dive vessel traffic peaks at midday.',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Carcharhinus longimanus acoustic tags registered significant depth changes...' }] }] },
      type: ArticleType.EXPLAINER,
      status: ContentStatus.PUBLISHED,
      published_at: new Date('2026-10-05T16:00:00Z'),
      reading_minutes: 6,
      verified_by_user_id: reviewerUser.id,
      last_verified_at: new Date('2026-10-05T16:00:00Z'),
      is_demo: true,
    },
  ];

  for (const art of articlesData) {
    const createdArticle = await prisma.article.upsert({
      where: { slug: art.slug },
      update: {},
      create: art,
    });

    // Mandatory source URL check for news articles
    await prisma.articleSource.create({
      data: {
        article_id: createdArticle.id,
        title: 'National Institute of Oceanography and Fisheries Field Report 2026',
        publisher: 'NIOF Marine Science Directorate',
        url: 'https://niof.sci.eg/reports/2026/redsea-transect-data',
      },
    });
  }

  // 9. Seed Sightings (10 Sightings with exact & public blurred coordinates)
  const sightingsData = [
    {
      reported_common_name: 'Dugong (Sea Cow)',
      observation_type: ObservationType.MARINE,
      count: 1,
      behavior: 'Solitary grazing on Halophila stipulacea meadow at 6m depth. Alert and undisturbed.',
      notes: 'No propeller scars observed on caudal fin.',
      observed_at: new Date('2026-10-25T10:30:00Z'),
      lat_exact: 24.6754,
      lng_exact: 35.0912,
      lat_public: 24.65, // Blurred ~11km grid centroid
      lng_public: 35.05,
      location_label: 'Marsa Abu Dabbab, Marsa Alam Coast',
      status: SightingStatus.APPROVED,
      reporter_name: 'Ahmed Fathy',
      reporter_email: 'ahmed.diver@sample-domain.com',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Hawksbill Sea Turtle',
      observation_type: ObservationType.MARINE,
      count: 2,
      behavior: 'Adult female grazing on soft sponges along steep drop-off at 14m depth.',
      notes: 'Tagged flipper noted: EGY-T-491.',
      observed_at: new Date('2026-10-24T14:15:00Z'),
      lat_exact: 27.7289,
      lng_exact: 34.2541,
      lat_public: 27.75,
      lng_public: 34.25,
      location_label: 'Shark Reef, Ras Mohammed',
      status: SightingStatus.APPROVED,
      reporter_name: 'Clara Schmidt',
      reporter_email: 'clara.s@sample-domain.de',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Whale Shark',
      observation_type: ObservationType.MARINE,
      count: 1,
      behavior: 'Surface filter-feeding in calm offshore sea state (Beaufort 1). Length ~5.5m.',
      notes: 'Photographed left flank spot patterns for global registry.',
      observed_at: new Date('2026-10-21T09:40:00Z'),
      lat_exact: 25.1234,
      lng_exact: 34.8721,
      lat_public: 25.15,
      lng_public: 34.85,
      location_label: 'Elphinstone Reef Offshore Sector',
      status: SightingStatus.APPROVED,
      reporter_name: 'Capt. Hany Refaat',
      reporter_email: 'hany@sample-charters.eg',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Spinner Dolphin Pod',
      observation_type: ObservationType.MARINE,
      count: 24,
      behavior: 'Resting circular swimming within protected lagoon. Several calves present.',
      notes: 'All tourist vessels kept 100m standoff distance.',
      observed_at: new Date('2026-10-20T11:00:00Z'),
      lat_exact: 24.9542,
      lng_exact: 34.9812,
      lat_public: 24.9542, // Non-sensitive species: exact public coords permitted in designated zone
      lng_public: 34.9812,
      location_label: 'Sha’ab Samadai (Dolphin House)',
      status: SightingStatus.APPROVED,
      reporter_name: 'Nadia El-Baz',
      reporter_email: 'nadia@sample-domain.com',
      is_sensitive_species: false,
      is_demo: true,
    },
    {
      reported_common_name: 'Western Osprey Pair',
      observation_type: ObservationType.BIRD,
      count: 2,
      behavior: 'Active nest maintenance on top of abandoned wooden navigation beacon.',
      notes: 'Carrying large needlefish to nest.',
      observed_at: new Date('2026-10-19T07:20:00Z'),
      lat_exact: 27.2312,
      lng_exact: 33.9189,
      lat_public: 27.2312,
      lng_public: 33.9189,
      location_label: 'Giftun Island Northern Spit',
      status: SightingStatus.APPROVED,
      reporter_name: 'Dr. John Miller',
      reporter_email: 'jmiller@sample-ornithology.org',
      is_sensitive_species: false,
      is_demo: true,
    },
    {
      reported_common_name: 'Green Sea Turtle',
      observation_type: ObservationType.MARINE,
      count: 3,
      behavior: 'Mating behavior observed at surface 200m offshore from sandy cove.',
      notes: 'Surface visibility ~25m.',
      observed_at: new Date('2026-10-18T16:45:00Z'),
      lat_exact: 24.3811,
      lng_exact: 35.3129,
      lat_public: 24.35,
      lng_public: 35.35,
      location_label: 'Ras Baghdadi, Hamata Sector',
      status: SightingStatus.APPROVED,
      reporter_name: 'Mahmoud Soliman',
      reporter_email: 'soliman@sample-domain.eg',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Red Sea Clownfish Colony',
      observation_type: ObservationType.MARINE,
      count: 6,
      behavior: 'Nesting inside Magnificent Sea Anemone (*Heteractis magnifica*). Eggs visible on rock base.',
      notes: 'Vibrant coloration, no anemone bleaching.',
      observed_at: new Date('2026-10-17T12:10:00Z'),
      lat_exact: 27.1891,
      lng_exact: 33.8412,
      lat_public: 27.1891,
      lng_public: 33.8412,
      location_label: 'Gota Abu Ramada, Hurghada',
      status: SightingStatus.APPROVED,
      reporter_name: 'Elena Rostova',
      reporter_email: 'elena@sample-domain.org',
      is_sensitive_species: false,
      is_demo: true,
    },
    {
      reported_common_name: 'Zebra Shark (Stegostoma tigrinum)',
      observation_type: ObservationType.MARINE,
      count: 1,
      behavior: 'Resting on sand channel between two reef pinnacles at 22m depth.',
      notes: 'Estimated total length 2.2 meters.',
      observed_at: new Date('2026-10-16T15:00:00Z'),
      lat_exact: 25.0412,
      lng_exact: 34.8914,
      lat_public: 25.05,
      lng_public: 34.85,
      location_label: 'Marsa Alam South Pinnacle',
      status: SightingStatus.APPROVED,
      reporter_name: 'Peter Lindgren',
      reporter_email: 'peter@sample-scuba.se',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Dugong Sighting (Pending Review)',
      observation_type: ObservationType.MARINE,
      count: 1,
      behavior: 'Possible juvenile surfacing in shallow turbid water.',
      notes: 'Submitted via mobile form by visiting snorkeler.',
      observed_at: new Date('2026-10-26T08:15:00Z'),
      lat_exact: 24.6811,
      lng_exact: 35.0891,
      lat_public: 24.65,
      lng_public: 35.05,
      location_label: 'Marsa Egla',
      status: SightingStatus.PENDING, // in moderation queue
      reporter_name: 'Sarah Connor',
      reporter_email: 'sarah.c@sample-visitor.com',
      is_sensitive_species: true,
      is_demo: true,
    },
    {
      reported_common_name: 'Pelagic Oceanic Whitetip Shark',
      observation_type: ObservationType.MARINE,
      count: 1,
      behavior: 'Cruising beneath liveaboard mooring lines at 3m depth.',
      notes: 'Pilot fish accompaniment noted.',
      observed_at: new Date('2026-10-26T14:30:00Z'),
      lat_exact: 25.3167,
      lng_exact: 34.8667,
      lat_public: 25.35,
      lng_public: 34.85,
      location_label: 'Elphinstone North Plateau',
      status: SightingStatus.PENDING, // in moderation queue
      reporter_name: 'Tarek Amin',
      reporter_email: 'tarek.divemaster@sample.eg',
      is_sensitive_species: true,
      is_demo: true,
    },
  ];

  for (const s of sightingsData) {
    await prisma.sighting.create({
      data: s,
    });
  }

  console.log('✅ Seed completed successfully! All records flagged with is_demo = true.');
}

main()
  .catch((e) => {
    console.error('❌ Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
