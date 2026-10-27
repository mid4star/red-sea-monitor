// ==============================================================================
// RED SEA MONITOR — CORE DOMAIN TYPE DEFINITIONS
// ==============================================================================

export type Language = 'ar' | 'en';

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'editor' 
  | 'researcher' 
  | 'moderator' 
  | 'field_observer' 
  | 'registered_user';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  preferredLanguage: Language;
}

export type ConservationStatus = 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD';

export interface MarineSpecies {
  id: string;
  slug: string;
  scientificName: string;
  taxonomicGroup: 'Marine Mammals' | 'Reptiles' | 'Fish' | 'Corals' | 'Elasmobranchs' | 'Invertebrates';
  conservationStatus: ConservationStatus;
  statusSource: string;
  isLocationSensitive: boolean;
  commonName: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  threats: {
    ar: string;
    en: string;
  };
  conservationMeasures: {
    ar: string;
    en: string;
  };
  imageUrl?: string;
}

export interface ProtectedArea {
  id: string;
  slug: string;
  areaType: 'National Park' | 'Managed Resource Protected Area' | 'Marine Reserve' | 'Nature Sanctuary';
  officialDesignation: string;
  designationYear: number;
  areaSizeKm2: number;
  latitude: number;
  longitude: number;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  conservationObjectives: {
    ar: string;
    en: string;
  };
  imageUrl?: string;
}

export type ObservationType = 
  | 'wildlife_sighting' 
  | 'nesting_activity' 
  | 'coral_bleaching' 
  | 'entanglement' 
  | 'injury' 
  | 'dead_stranded';

export type ReviewStatus = 'pending' | 'under_review' | 'verified' | 'rejected' | 'needs_correction';

export interface WildlifeObservation {
  id: string;
  speciesId?: string;
  speciesName?: {
    ar: string;
    en: string;
  };
  protectedAreaId?: string;
  protectedAreaName?: {
    ar: string;
    en: string;
  };
  observationType: ObservationType;
  observedAt: string;
  submittedAt: string;
  latitude: number;
  longitude: number;
  isLocationGeneralized: boolean;
  accuracyM: number;
  countIndividuals: number;
  confidence: 'certain' | 'probable' | 'uncertain';
  reviewStatus: ReviewStatus;
  description: string;
  reporterName?: string;
  mediaUrls?: string[];
  reviewNotes?: string;
}

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentType = 
  | 'oil_spill' 
  | 'anchor_damage' 
  | 'illegal_fishing' 
  | 'plastic_pollution' 
  | 'vessel_grounding' 
  | 'sewage_discharge';

export interface EnvironmentalIncident {
  id: string;
  incidentType: IncidentType;
  severity: IncidentSeverity;
  observedAt: string;
  latitude: number;
  longitude: number;
  locationDescription: string;
  description: string;
  reviewStatus: 'pending' | 'investigating' | 'action_taken' | 'resolved' | 'closed';
  reporterName?: string;
}

export interface ResearchResource {
  id: string;
  slug: string;
  resourceType: 'peer_reviewed_paper' | 'technical_report' | 'dataset' | 'field_guide' | 'policy_brief';
  publicationDate: string;
  doi?: string;
  sourceUrl?: string;
  institution: string;
  title: {
    ar: string;
    en: string;
  };
  abstract: {
    ar: string;
    en: string;
  };
  keywords: string[];
  downloadUrl?: string;
}

export interface Opportunity {
  id: string;
  slug: string;
  opportunityType: 'grant' | 'job' | 'internship' | 'training' | 'scholarship' | 'volunteering';
  organizer: string;
  locationText: string;
  deadline?: string;
  applicationUrl: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  eligibility: {
    ar: string;
    en: string;
  };
  status: 'open' | 'closed';
}

export interface AuditLogItem {
  id: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  details: string;
}


// ==============================================================================
// REGIONAL BASIN TYPES (PHASE B)
// ==============================================================================

export type CountryStatus = 'ACTIVE' | 'COMING_SOON';

export interface RegionalCountry {
  id: string;
  iso2: string;
  slug: string;
  name: string;
  native_name: string;
  flag_emoji?: string | null;
  latitude: number;
  longitude: number;
  coast_length_km?: number | null;
  summary: string;
  status: CountryStatus;
  is_published: boolean;
}

export interface MarineRegion {
  id: string;
  slug: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
