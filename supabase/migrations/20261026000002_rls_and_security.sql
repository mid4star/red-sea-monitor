-- ==============================================================================
-- RED SEA MONITOR — ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- Migration: 20261026000002_rls_and_security.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HELPER FUNCTIONS FOR PERMISSION & ROLE VERIFICATION
-- ------------------------------------------------------------------------------

-- Check if current authenticated user has a specific permission
CREATE OR REPLACE FUNCTION auth_has_permission(p_permission TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        WHERE ur.user_id = auth.uid()
          AND rp.permission_id = p_permission
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current authenticated user has a specific role
CREATE OR REPLACE FUNCTION auth_has_role(p_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        WHERE ur.user_id = auth.uid()
          AND ur.role_id = p_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is admin or super_admin
CREATE OR REPLACE FUNCTION auth_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        WHERE ur.user_id = auth.uid()
          AND ur.role_id IN ('super_admin', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 2. ENABLE RLS ON ALL PUBLIC SCHEMAS
-- ------------------------------------------------------------------------------

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

ALTER TABLE species ENABLE ROW LEVEL SECURITY;
ALTER TABLE species_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE protected_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE protected_area_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE protected_area_species ENABLE ROW LEVEL SECURITY;

ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE observation_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE observation_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_incidents ENABLE ROW LEVEL SECURITY;

ALTER TABLE conservation_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_protected_areas ENABLE ROW LEVEL SECURITY;

ALTER TABLE research_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_resource_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_resource_authors ENABLE ROW LEVEL SECURITY;

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_translations ENABLE ROW LEVEL SECURITY;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. PROFILES POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (account_status = 'active');

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 4. CONTENT & EDITORIAL POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Published articles viewable by everyone"
    ON articles FOR SELECT
    USING (status = 'published' OR auth_is_admin() OR auth_has_role('editor'));

CREATE POLICY "Authorized editors can manage articles"
    ON articles FOR ALL
    USING (auth_has_permission('articles.publish') OR auth_is_admin());

CREATE POLICY "Article translations viewable if article is viewable"
    ON article_translations FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM articles a WHERE a.id = article_translations.article_id
        AND (a.status = 'published' OR auth_is_admin() OR auth_has_role('editor'))
    ));

CREATE POLICY "Categories and tags viewable by everyone"
    ON categories FOR SELECT USING (true);
CREATE POLICY "Category translations viewable by everyone"
    ON category_translations FOR SELECT USING (true);
CREATE POLICY "Tags viewable by everyone"
    ON tags FOR SELECT USING (true);
CREATE POLICY "Tag translations viewable by everyone"
    ON tag_translations FOR SELECT USING (true);
CREATE POLICY "Article tags viewable by everyone"
    ON article_tags FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- 5. MARINE SPECIES & PROTECTED AREAS POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Species viewable by everyone"
    ON species FOR SELECT USING (true);
CREATE POLICY "Species translations viewable by everyone"
    ON species_translations FOR SELECT USING (true);

CREATE POLICY "Protected areas viewable by everyone"
    ON protected_areas FOR SELECT USING (true);
CREATE POLICY "Protected area translations viewable by everyone"
    ON protected_area_translations FOR SELECT USING (true);
CREATE POLICY "Protected area species viewable by everyone"
    ON protected_area_species FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- 6. OBSERVATIONS & INCIDENTS (RED SEA WATCH)
-- ------------------------------------------------------------------------------

-- Public can view only verified observations
CREATE POLICY "Public can view verified observations"
    ON observations FOR SELECT
    USING (
        review_status = 'verified'
        OR auth.uid() = reporter_id
        OR auth_is_admin()
        OR auth_has_role('moderator')
        OR auth_has_role('researcher')
    );

-- Any registered or public user can submit an observation
CREATE POLICY "Users can submit observations"
    ON observations FOR INSERT
    WITH CHECK (auth.uid() = reporter_id OR reporter_id IS NULL);

-- Reporters can update their pending observations
CREATE POLICY "Reporters can update their pending observations"
    ON observations FOR UPDATE
    USING (auth.uid() = reporter_id AND review_status = 'pending');

-- Moderators & Admins can update any observation review status
CREATE POLICY "Moderators can review observations"
    ON observations FOR UPDATE
    USING (auth_has_permission('observations.moderate') OR auth_is_admin());

-- Environmental incidents: viewable by admins, moderators, or the reporter
CREATE POLICY "Incidents viewable by reporter and staff"
    ON environmental_incidents FOR SELECT
    USING (
        auth.uid() = reporter_id
        OR auth_is_admin()
        OR auth_has_role('moderator')
    );

CREATE POLICY "Anyone can report an incident"
    ON environmental_incidents FOR INSERT
    WITH CHECK (auth.uid() = reporter_id OR reporter_id IS NULL);

-- ------------------------------------------------------------------------------
-- 7. SECURE VIEW FOR COORDINATE OBFUSCATION
-- ------------------------------------------------------------------------------

CREATE OR REPLACE VIEW public_observations AS
SELECT 
    o.id,
    o.species_id,
    o.protected_area_id,
    o.observation_type,
    o.observed_at,
    o.count_individuals,
    o.identification_confidence,
    o.review_status,
    o.description,
    -- Obfuscate coordinates if location is sensitive and user lacks permission
    CASE 
        WHEN s.is_location_sensitive = true AND NOT auth_has_permission('coordinates.view_sensitive')
        THEN ROUND(o.latitude::numeric, 1) -- Approximate to ~11km grid
        ELSE o.latitude
    END AS latitude,
    CASE 
        WHEN s.is_location_sensitive = true AND NOT auth_has_permission('coordinates.view_sensitive')
        THEN ROUND(o.longitude::numeric, 1) -- Approximate to ~11km grid
        ELSE o.longitude
    END AS longitude,
    CASE 
        WHEN s.is_location_sensitive = true AND NOT auth_has_permission('coordinates.view_sensitive')
        THEN true
        ELSE false
    END AS is_location_generalized
FROM observations o
LEFT JOIN species s ON o.species_id = s.id
WHERE o.review_status = 'verified'
   OR o.reporter_id = auth.uid()
   OR auth_is_admin()
   OR auth_has_role('moderator');

-- ------------------------------------------------------------------------------
-- 8. AUDIT LOG TRIGGER
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION log_admin_audit_event()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, metadata)
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id::text, OLD.id::text),
        json_build_object(
            'old', to_jsonb(OLD),
            'new', to_jsonb(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach audit trigger to critical actions
DROP TRIGGER IF EXISTS audit_observations_trigger ON observations;
CREATE TRIGGER audit_observations_trigger
AFTER UPDATE ON observations
FOR EACH ROW WHEN (OLD.review_status IS DISTINCT FROM NEW.review_status)
EXECUTE FUNCTION log_admin_audit_event();

DROP TRIGGER IF EXISTS audit_articles_trigger ON articles;
CREATE TRIGGER audit_articles_trigger
AFTER UPDATE ON articles
FOR EACH ROW WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION log_admin_audit_event();
