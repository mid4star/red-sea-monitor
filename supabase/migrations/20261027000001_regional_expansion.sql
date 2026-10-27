-- Migration: 20261027000001_regional_expansion.sql
-- Description: Widens Red Sea Monitor scope to the entire Red Sea rift basin.
-- Adds countries (Egypt, Sudan, Eritrea, Djibouti, Yemen, Saudi Arabia, Jordan)
-- and 6 core marine regions, plus join tables and entity foreign keys.

-- 1. Create Countries Table
CREATE TYPE country_status AS ENUM ('ACTIVE', 'COMING_SOON');

CREATE TABLE IF NOT EXISTS countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    iso2 VARCHAR(2) UNIQUE NOT NULL,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    native_name VARCHAR(128) NOT NULL,
    flag_emoji VARCHAR(8),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    coast_length_km INTEGER,
    summary TEXT NOT NULL,
    status country_status NOT NULL DEFAULT 'ACTIVE',
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Marine Regions Table
CREATE TABLE IF NOT EXISTS marine_regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Join Tables for Multi-Country Coverage
CREATE TABLE IF NOT EXISTS article_countries (
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, country_id)
);

CREATE TABLE IF NOT EXISTS library_countries (
    library_item_id UUID NOT NULL REFERENCES library_items(id) ON DELETE CASCADE,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    PRIMARY KEY (library_item_id, country_id)
);

CREATE TABLE IF NOT EXISTS opportunity_countries (
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    PRIMARY KEY (opportunity_id, country_id)
);

CREATE TABLE IF NOT EXISTS species_countries (
    species_id UUID NOT NULL REFERENCES species(id) ON DELETE CASCADE,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    PRIMARY KEY (species_id, country_id)
);

-- 4. Foreign Keys and Regional Metadata Columns
ALTER TABLE places 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS marine_region_id UUID REFERENCES marine_regions(id) ON DELETE SET NULL;

ALTER TABLE sightings 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS marine_region_id UUID REFERENCES marine_regions(id) ON DELETE SET NULL;

ALTER TABLE articles 
    ADD COLUMN IF NOT EXISTS marine_region_id UUID REFERENCES marine_regions(id) ON DELETE SET NULL;

ALTER TABLE species 
    ADD COLUMN IF NOT EXISTS endemic_to_red_sea BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE opportunities 
    ADD COLUMN IF NOT EXISTS is_open_to_all_nationalities BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS eligible_countries TEXT[] DEFAULT '{}';

ALTER TABLE headlines 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

ALTER TABLE routes 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

ALTER TABLE makers 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

ALTER TABLE organizations 
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_countries_status ON countries(status, is_published);
CREATE INDEX IF NOT EXISTS idx_places_country ON places(country_id);
CREATE INDEX IF NOT EXISTS idx_places_marine_region ON places(marine_region_id);
CREATE INDEX IF NOT EXISTS idx_sightings_country ON sightings(country_id);
CREATE INDEX IF NOT EXISTS idx_sightings_marine_region ON sightings(marine_region_id);
CREATE INDEX IF NOT EXISTS idx_species_endemic ON species(endemic_to_red_sea);
