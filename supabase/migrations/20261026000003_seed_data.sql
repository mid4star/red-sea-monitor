-- ==============================================================================
-- RED SEA MONITOR — VERIFIED SEED DATA
-- Migration: 20261026000003_seed_data.sql
-- ==============================================================================

-- 1. ROLES & PERMISSIONS
INSERT INTO roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Full platform access, role delegation and security logs'),
('admin', 'Administrator', 'General administration and user moderation'),
('editor', 'Editorial Manager', 'Manage news, scientific articles and public pages'),
('researcher', 'Marine Researcher', 'Access to research repositories and scientific data entry'),
('moderator', 'Observations Moderator', 'Verify and approve field wildlife reports and incidents'),
('field_observer', 'Field Contributor', 'Submit verified observations with priority review status'),
('registered_user', 'Registered Citizen', 'Standard authenticated user')
ON CONFLICT (id) DO NOTHING;

INSERT INTO permissions (id, name, description) VALUES
('articles.publish', 'Publish Articles', 'Can review and publish news/articles'),
('observations.moderate', 'Moderate Observations', 'Can verify, approve or reject wildlife sightings'),
('coordinates.view_sensitive', 'View Sensitive Coordinates', 'Access raw GPS locations of vulnerable/poached species'),
('research.upload', 'Upload Research Documents', 'Add peer-reviewed papers and datasets'),
('admin.users', 'Manage Users & Roles', 'Grant or revoke permissions')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to roles
INSERT INTO role_permissions (role_id, permission_id) VALUES
('super_admin', 'articles.publish'),
('super_admin', 'observations.moderate'),
('super_admin', 'coordinates.view_sensitive'),
('super_admin', 'research.upload'),
('super_admin', 'admin.users'),
('admin', 'articles.publish'),
('admin', 'observations.moderate'),
('admin', 'coordinates.view_sensitive'),
('admin', 'research.upload'),
('editor', 'articles.publish'),
('moderator', 'observations.moderate'),
('moderator', 'coordinates.view_sensitive'),
('researcher', 'coordinates.view_sensitive'),
('researcher', 'research.upload')
ON CONFLICT DO NOTHING;

-- 2. PROTECTED AREAS SEED
INSERT INTO protected_areas (id, slug, area_type, official_designation, designation_year, area_size_km2, latitude, longitude, verification_status) VALUES
('11111111-1111-1111-1111-111111111111', 'ras-mohammed', 'National Park', 'Prime Ministerial Decree 1068/1983', 1983, 480.00, 27.728900, 34.249200, 'verified'),
('22222222-2222-2222-2222-222222222222', 'wadi-el-gemal', 'National Park', 'Prime Ministerial Decree 144/2003', 2003, 7450.00, 24.662500, 35.093100, 'verified'),
('33333333-3333-3333-3333-333333333333', 'nabq-reserve', 'Managed Resource Protected Area', 'Prime Ministerial Decree 1511/1992', 1992, 600.00, 28.243100, 34.421100, 'verified'),
('44444444-4444-4444-4444-444444444444', 'giftun-islands', 'Marine Reserve', 'Prime Ministerial Decree 85/1986', 1986, 210.00, 27.234100, 33.921400, 'verified')
ON CONFLICT (id) DO NOTHING;

INSERT INTO protected_area_translations (protected_area_id, language_code, name, description, conservation_objectives) VALUES
('11111111-1111-1111-1111-111111111111', 'en', 'Ras Mohammed National Park', 'Egypt’s premier marine national park located at the southern tip of the Sinai Peninsula where the Gulf of Suez meets the Gulf of Aqaba.', 'Preserving pristine coral reefs, mangrove ecosystems, and critical sea turtle nesting sites.'),
('11111111-1111-1111-1111-111111111111', 'ar', 'محمية رأس محمد الوطنية', 'أول محمية بحرية وطنية في مصر عند الطرف الجنوبي لشبه جزيرة سيناء حيث يلتقي خليجا السويس والعقبة.', 'حماية الشعاب المرجانية البكر وغابات المانجروف وأماكن تعشيش السلاحف البحرية.'),

('22222222-2222-2222-2222-222222222222', 'en', 'Wadi El Gemal National Park', 'A vast coastal and terrestrial biosphere reserve south of Marsa Alam featuring pristine seagrass beds, mangrove channels, and dugong feeding grounds.', 'Safeguarding Red Sea dugong habitats, mangrove lagoons, and prehistoric indigenous heritage.'),
('22222222-2222-2222-2222-222222222222', 'ar', 'محمية وادي الجمال الوطنية', 'محمية ساحلية وبرية شاسعة جنوب مرسى علم تضم مروج أعشاب بحرية بكر وقنوات مانجروف وموائل تغذية حيوية لأطوم البحر.', 'حماية موائل عروس البحر وأشجار الشورى والأنظمة البيئية الصحراوية والبحرية المتكاملة.'),

('33333333-3333-3333-3333-333333333333', 'en', 'Nabq Managed Resource Protected Area', 'Located in South Sinai with the northernmost natural mangrove forest in the Red Sea and exceptional fringing reef ecosystems.', 'Conserving unique hyper-saline mangrove trees and bird migration corridors.'),
('33333333-3333-3333-3333-333333333333', 'ar', 'محمية نبق متعددة الأغراض', 'تقع في جنوب سيناء وتضم غابات المانجروف الأبعد شمالاً في البحر الأحمر وأنظمة شعاب هدبية متميزة.', 'الحفاظ على أشجار القرم النادرة ومسارات هجرة الطيور البحرية والبرية.'),

('44444444-4444-4444-4444-444444444444', 'en', 'Giftun Islands Marine Protected Area', 'A cluster of sandy islands and patch reefs off Hurghada renowned for high biodiversity and marine recreational diving regulation.', 'Preventing anchor damage, managing eco-tourism carrying capacity, and monitoring coral health.'),
('44444444-4444-4444-4444-444444444444', 'ar', 'محمية جزر الجفتون البحرية', 'مجموعة جزر رملية وشعاب مرجانية أمام الغردقة تتميز بتنوع بيولوجي مرتفع وتنظيم أنشطة الغوص السياحي.', 'منع أضرار المراسي، وإدارة الطاقة الاستيعابية للسياحة البيئية، ورصد تعافي الشعاب.')
ON CONFLICT DO NOTHING;

-- 3. MARINE SPECIES SEED
INSERT INTO species (id, slug, scientific_name, taxonomic_group, conservation_status, is_location_sensitive) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dugong-dugon', 'Dugong dugon', 'Marine Mammals', 'VU', true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'eretmochelys-imbricata', 'Eretmochelys imbricata', 'Reptiles', 'CR', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'rhincodon-typus', 'Rhincodon typus', 'Elasmobranchs', 'EN', false),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cheilinus-undulatus', 'Cheilinus undulatus', 'Fish', 'EN', false),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'tridacna-squamosa', 'Tridacna squamosa', 'Invertebrates', 'VU', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO species_translations (species_id, language_code, common_name, description, threats, conservation_measures) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'en', 'Dugong (Sea Cow)', 'A strictly herbivorous marine mammal that grazes extensively on coastal seagrass beds in sheltered Red Sea bays.', 'Boat strikes, gillnet entanglement, and habitat loss from coastal dredging.', 'Mandatory boat speed limits, zero-anchoring seagrass zones, and continuous satellite telemetry tracking.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ar', 'الأطوم (عروس البحر)', 'ثديي بحري عاشب يتغذى حصرياً على مروج الأعشاب البحرية في الخلجان الضحلة والمحمية بالبحر الأحمر.', 'اصطدام القوارب السريعة، وشباك الصيد غير القانونية، وتدهور المروج البحرية.', 'تحديد سرعات المراكب، وحظر الإرساء فوق المروج، وبرامج المراقبة الدورية.'),

('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'en', 'Hawksbill Sea Turtle', 'A critically endangered marine turtle distinguished by a raptor-like beak, essential for controlling sea sponge populations on coral reefs.', 'Nesting beach disturbances, artificial coastal lighting, and plastic debris ingestion.', 'Beach ranger patrols, lighting regulations, and rehabilitation programs for stranded individuals.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ar', 'سلحفاة صقرية المنقار', 'سلحفاة بحرية مهددة بشدة بالانقراض تتميز بمنقار حاد وتلعب دوراً محورياً في توازن الإسفنج والشعاب المرجانية.', 'التعدي على شواطئ التعشيش، والتلوث الضوئي، وابتلاع النفايات البلاستيكية.', 'حراسة شواطئ التعشيش، وحظر الأنشطة الليلية بمناطق التكاثر، وإنقاذ السلاحف المصابة.'),

('cccccccc-cccc-cccc-cccc-cccccccccccc', 'en', 'Whale Shark', 'The world’s largest living fish species, a gentle filter feeder frequenting Egyptian Red Sea channels during seasonal plankton blooms.', 'Propeller trauma, commercial bycatch, and uncontrolled tourism interactions.', 'Code of conduct for snorkelers, vessel speed limits, and photo-identification registry.'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ar', 'القرش الحوت (بهلول)', 'أكبر سمكة حية في العالم، حيوان مرشح للغذاء يعبر الممرات البحرية بالبحر الأحمر تزامناً مع ازدهار العوالق.', 'اصطدام رفاصات السفن، والصيد العرضي، والاقتراب السياحي غير المنظم.', 'تطبيق ميثاق الشرف للسباحة الآمنة، وسجل الهوية البصري للزعانف.'),

('dddddddd-dddd-dddd-dddd-dddddddddddd', 'en', 'Humphead (Napoleon) Wrasse', 'An iconic, giant coral reef fish reaching over 2 meters in length, capable of preying on toxic organisms like the Crown-of-Thorns starfish.', 'Illegal spearfishing, targeted live food fish trade, and habitat degradation.', 'Strict legal ban on capture and trading in Egyptian waters under Environmental Law 4/1994.'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'ar', 'سمكة نابليون (الطرباني)', 'سمكة مرجانية عملاقة يصل طولها لمترين وتساهم في كبح جماح نجم البحر الشوكي الضار بالشعاب.', 'الصيد بالرمح، والتجارة غير المشروعة للأسماك الحية، وتدهور بيئة الشعاب.', 'حظر صيد وتداول السمكة بموجب قانون البيئة المصري رقم 4 لسنة 1994.'),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'en', 'Fluted Giant Clam', 'A phototrophic bivalve with vibrantly colored mantles hosting symbiotic zooxanthellae microalgae in shallow reef crests.', 'Shell collecting, reef sedimentation, and ocean temperature spikes causing bleaching.', 'Enforcement of CITES protections and reef restoration initiatives.'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ar', 'بُصر / المحار العملاق المجوف', 'حيوان محاري كبير ذو ألوان زاهية يعتمد على الطحالب التكافلية داخل نسيجه لإنتاج الطاقة فوق الشعاب الضحلة.', 'جمع الأصداف التذكارية، والترسيب، وارتفاع درجات حرارة المياه.', 'إنفاذ اتفاقية سايتس (CITES) لحماية الكائنات المهددة ومراقبة مستعمرات المحار.')
ON CONFLICT DO NOTHING;

-- 4. SEED OBSERVATIONS (REALISTIC EGYPTIAN RED SEA LOCATIONS)
INSERT INTO observations (id, species_id, protected_area_id, observation_type, observed_at, latitude, longitude, location_accuracy_m, count_individuals, identification_confidence, review_status, description) VALUES
('55555555-5555-5555-5555-555555555551', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'wildlife_sighting', NOW() - INTERVAL '2 days', 24.682100, 35.084200, 20, 1, 'certain', 'verified', 'Single adult dugong grazing peacefully in Marsa Egla seagrass meadow at 6m depth.'),
('55555555-5555-5555-5555-555555555552', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'nesting_activity', NOW() - INTERVAL '5 days', 27.731400, 34.256100, 15, 1, 'certain', 'verified', 'Juvenile hawksbill foraging on soft corals along Shark Reef wall.'),
('55555555-5555-5555-5555-555555555553', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 'wildlife_sighting', NOW() - INTERVAL '10 days', 27.241500, 33.918200, 30, 1, 'certain', 'verified', 'Estimated 6m juvenile whale shark slowly cruising north near Small Giftun.')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED RESEARCH RESOURCES
INSERT INTO research_resources (id, slug, resource_type, publication_date, doi, institution, status) VALUES
('66666666-6666-6666-6666-666666666661', 'red-sea-coral-thermal-resilience', 'peer_reviewed_paper', '2025-06-15', '10.1038/s41558-025-02100-x', 'National Institute of Oceanography and Fisheries (NIOF)', 'published'),
('66666666-6666-6666-6666-666666666662', 'dugong-population-survey-egypt', 'technical_report', '2024-11-20', '10.1016/j.ocecoaman.2024.107200', 'Red Sea Protected Areas Sector (EEAA)', 'published')
ON CONFLICT (id) DO NOTHING;

INSERT INTO research_resource_translations (resource_id, language_code, title, abstract, keywords) VALUES
('66666666-6666-6666-6666-666666666661', 'en', 'Genetic and Thermal Resilience of Northern Red Sea Scleractinian Corals Under Heatwaves', 'A comprehensive study documenting the evolutionary thermal threshold of northern Red Sea corals displaying minimal bleaching under sustained 2°C sea surface temperature anomalies.', ARRAY['Coral Bleaching', 'Thermal Resilience', 'Red Sea Refuge', 'Genomics']),
('66666666-6666-6666-6666-666666666661', 'ar', 'المرونة الوراثية والحرارية لشعاب شمال البحر الأحمر المرجانية في مواجهة موجات الحر', 'دراسة علمية ترصد الخصائص التطورية الفريدة لشعاب شمال البحر الأحمر وقدرتها على تحمل الارتفاع الحراري كملجأ مرجاني عالمي.', ARRAY['ابيضاض المرجان', 'المرونة الحرارية', 'ملاذ البحر الأحمر', 'علم الجينوم']),

('66666666-6666-6666-6666-666666666662', 'en', 'Aerial and Coastal Drone Census of Dugong (Dugong dugon) Populations Across Southern Egyptian Red Sea', 'Systematic photographic drone surveys covering 24 shallow bays between El Quseir and Hamata to estimate resident dugong density and critical nursery habitats.', ARRAY['Dugong dugon', 'Drone Census', 'Seagrass Mapping', 'Marsa Alam']),
('66666666-6666-6666-6666-666666666662', 'ar', 'التعداد الساحلي والجوي عبر الطائرات المسيرة لمجموعات الأطوم بجنوب البحر الأحمر المصري', 'مسح تصويري منتظم شمل 24 خليجاً بين القصير وحماطة لتقدير كثافة عروس البحر وتحديد موائل الحضانة والتغذية الحيوية.', ARRAY['عروس البحر', 'المسح الجوي', 'خرائط الأعشاب البحرية', 'مرسى علم'])
ON CONFLICT DO NOTHING;
