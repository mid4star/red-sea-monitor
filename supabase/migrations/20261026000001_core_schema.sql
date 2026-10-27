-- ==============================================================================
-- RED SEA MONITOR — PRODUCTION RELATIONAL DATABASE MIGRATION
-- Migration: 20261026000001_core_schema.sql
-- Description: Core tables, foreign keys, constraints, triggers, and indices.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. AUTHENTICATION & ACCESS CONTROL (RBAC)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    email TEXT UNIQUE,
    avatar_path TEXT,
    preferred_language VARCHAR(5) DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en')),
    account_status VARCHAR(20) DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'pending')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'super_admin', 'admin', 'editor', 'researcher', 'moderator', 'field_observer', 'registered_user'
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'articles.publish', 'observations.moderate', 'coordinates.view_sensitive'
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    granted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. MEDIA ASSETS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    alt_text_en TEXT,
    alt_text_ar TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'restricted')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. CONTENT MANAGEMENT (ARTICLES, CATEGORIES, TAGS)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category_translations (
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (category_id, language_code)
);

CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tag_translations (
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    name TEXT NOT NULL,
    PRIMARY KEY (tag_id, language_code)
);

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    cover_media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_translations (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    title TEXT NOT NULL,
    excerpt TEXT,
    body TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    PRIMARY KEY (article_id, language_code)
);

CREATE TABLE IF NOT EXISTS article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- ------------------------------------------------------------------------------
-- 4. MARINE SPECIES CATALOG
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS species (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    scientific_name VARCHAR(150) UNIQUE NOT NULL,
    taxonomic_group VARCHAR(50) NOT NULL, -- 'Marine Mammals', 'Reptiles', 'Fish', 'Corals', 'Elasmobranchs', 'Invertebrates'
    conservation_status VARCHAR(20) NOT NULL CHECK (conservation_status IN ('CR', 'EN', 'VU', 'NT', 'LC', 'DD')), -- IUCN codes
    status_source TEXT DEFAULT 'IUCN Red List 2026',
    status_verified_at DATE DEFAULT CURRENT_DATE,
    is_location_sensitive BOOLEAN DEFAULT FALSE,
    featured_media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS species_translations (
    species_id UUID REFERENCES species(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    common_name TEXT NOT NULL,
    description TEXT NOT NULL,
    habitat TEXT,
    threats TEXT,
    conservation_measures TEXT,
    PRIMARY KEY (species_id, language_code)
);

-- ------------------------------------------------------------------------------
-- 5. PROTECTED AREAS DIRECTORY
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS protected_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    area_type VARCHAR(50) NOT NULL, -- 'National Park', 'Managed Resource Protected Area', 'Marine Reserve', 'Nature Sanctuary'
    official_designation VARCHAR(150),
    designation_year INT,
    area_size_km2 NUMERIC(10, 2),
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    boundary_geojson JSONB,
    source_reference TEXT,
    verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('verified', 'unverified', 'proposed')),
    featured_media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS protected_area_translations (
    protected_area_id UUID REFERENCES protected_areas(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    conservation_objectives TEXT,
    visitor_information TEXT,
    PRIMARY KEY (protected_area_id, language_code)
);

CREATE TABLE IF NOT EXISTS protected_area_species (
    protected_area_id UUID REFERENCES protected_areas(id) ON DELETE CASCADE,
    species_id UUID REFERENCES species(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) DEFAULT 'resident' CHECK (relationship_type IN ('resident', 'migratory', 'nesting', 'foraging')),
    PRIMARY KEY (protected_area_id, species_id)
);

-- ------------------------------------------------------------------------------
-- 6. RED SEA WATCH (OBSERVATIONS & ENVIRONMENTAL INCIDENTS)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    species_id UUID REFERENCES species(id) ON DELETE SET NULL,
    protected_area_id UUID REFERENCES protected_areas(id) ON DELETE SET NULL,
    observation_type VARCHAR(50) NOT NULL CHECK (observation_type IN ('wildlife_sighting', 'nesting_activity', 'coral_bleaching', 'entanglement', 'injury', 'dead_stranded')),
    observed_at TIMESTAMPTZ NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    -- Precise coordinates stored internally
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    location_accuracy_m INT DEFAULT 50,
    depth_meters NUMERIC(6, 2),
    count_individuals INT DEFAULT 1 CHECK (count_individuals >= 1),
    identification_confidence VARCHAR(20) DEFAULT 'certain' CHECK (identification_confidence IN ('certain', 'probable', 'uncertain')),
    description TEXT,
    review_status VARCHAR(20) DEFAULT 'pending' CHECK (review_status IN ('pending', 'under_review', 'verified', 'rejected', 'needs_correction')),
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS observation_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    observation_id UUID REFERENCES observations(id) ON DELETE CASCADE,
    media_asset_id UUID REFERENCES media_assets(id) ON DELETE CASCADE,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS observation_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    observation_id UUID REFERENCES observations(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    decision VARCHAR(20) NOT NULL CHECK (decision IN ('verified', 'rejected', 'needs_correction')),
    notes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS environmental_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    incident_type VARCHAR(50) NOT NULL CHECK (incident_type IN ('oil_spill', 'anchor_damage', 'illegal_fishing', 'plastic_pollution', 'vessel_grounding', 'sewage_discharge')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    observed_at TIMESTAMPTZ NOT NULL,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    location_description TEXT,
    description TEXT NOT NULL,
    review_status VARCHAR(20) DEFAULT 'pending' CHECK (review_status IN ('pending', 'investigating', 'action_taken', 'resolved', 'closed')),
    assigned_reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. CONSERVATION PROJECTS & RESEARCH LIBRARY
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS conservation_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('proposed', 'active', 'completed', 'suspended')),
    start_date DATE NOT NULL,
    end_date DATE,
    lead_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    featured_media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_translations (
    project_id UUID REFERENCES conservation_projects(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    objectives TEXT,
    methodology TEXT,
    expected_outcomes TEXT,
    PRIMARY KEY (project_id, language_code)
);

CREATE TABLE IF NOT EXISTS project_species (
    project_id UUID REFERENCES conservation_projects(id) ON DELETE CASCADE,
    species_id UUID REFERENCES species(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, species_id)
);

CREATE TABLE IF NOT EXISTS project_protected_areas (
    project_id UUID REFERENCES conservation_projects(id) ON DELETE CASCADE,
    protected_area_id UUID REFERENCES protected_areas(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, protected_area_id)
);

CREATE TABLE IF NOT EXISTS research_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('peer_reviewed_paper', 'technical_report', 'dataset', 'field_guide', 'policy_brief')),
    publication_date DATE NOT NULL,
    doi TEXT,
    source_url TEXT,
    institution TEXT NOT NULL,
    file_media_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS research_resource_translations (
    resource_id UUID REFERENCES research_resources(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT[],
    PRIMARY KEY (resource_id, language_code)
);

CREATE TABLE IF NOT EXISTS research_authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    institution TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS research_resource_authors (
    resource_id UUID REFERENCES research_resources(id) ON DELETE CASCADE,
    author_id UUID REFERENCES research_authors(id) ON DELETE CASCADE,
    author_order INT DEFAULT 1,
    PRIMARY KEY (resource_id, author_id)
);

-- ------------------------------------------------------------------------------
-- 8. OPPORTUNITIES & EVENTS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    opportunity_type VARCHAR(50) NOT NULL CHECK (opportunity_type IN ('grant', 'job', 'internship', 'training', 'scholarship', 'volunteering')),
    organizer TEXT NOT NULL,
    location_text TEXT NOT NULL,
    application_url TEXT NOT NULL,
    deadline DATE,
    start_date DATE,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunity_translations (
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    eligibility TEXT,
    application_instructions TEXT,
    PRIMARY KEY (opportunity_id, language_code)
);

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    location_text TEXT NOT NULL,
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    registration_url TEXT,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_translations (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    language_code VARCHAR(5) CHECK (language_code IN ('ar', 'en')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (event_id, language_code)
);

-- ------------------------------------------------------------------------------
-- 9. CONFIGURATION, NOTIFICATIONS & AUDIT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link_url TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. INDEXES FOR PERFORMANCE & SPATIAL SEARCH
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_observations_status ON observations(review_status);
CREATE INDEX IF NOT EXISTS idx_observations_coords ON observations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_observations_species ON observations(species_id);
CREATE INDEX IF NOT EXISTS idx_observations_time ON observations(observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON environmental_incidents(review_status, severity);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id, created_at DESC);
