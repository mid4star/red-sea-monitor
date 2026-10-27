export type Role = 'ADMIN' | 'EDITOR' | 'REVIEWER' | 'CONTRIBUTOR';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  organization?: string | null;
}

export const PERMISSIONS = {
  // Articles
  ARTICLE_CREATE: ['ADMIN', 'EDITOR', 'CONTRIBUTOR'] as Role[],
  ARTICLE_EDIT: ['ADMIN', 'EDITOR', 'CONTRIBUTOR'] as Role[],
  ARTICLE_PUBLISH: ['ADMIN', 'EDITOR'] as Role[],
  ARTICLE_DELETE: ['ADMIN'] as Role[],

  // Sightings & Photo Stories Moderation
  SIGHTING_REVIEW: ['ADMIN', 'EDITOR', 'REVIEWER'] as Role[],
  SIGHTING_VIEW_EXACT_LOCATION: ['ADMIN', 'EDITOR', 'REVIEWER'] as Role[],
  SIGHTING_EXPORT_CSV: ['ADMIN', 'EDITOR', 'REVIEWER'] as Role[],

  // Explorer (Species, Places, Routes)
  EXPLORER_EDIT: ['ADMIN', 'EDITOR'] as Role[],
  EXPLORER_VERIFY_FACTS: ['ADMIN', 'EDITOR', 'REVIEWER'] as Role[],

  // Library
  LIBRARY_MANAGE: ['ADMIN', 'EDITOR', 'REVIEWER'] as Role[],

  // Opportunities & Headlines
  OPPORTUNITIES_MANAGE: ['ADMIN', 'EDITOR'] as Role[],
  HEADLINES_MANAGE: ['ADMIN', 'EDITOR'] as Role[],

  // Store & Makers (Phase 5)
  STORE_MANAGE: ['ADMIN', 'EDITOR'] as Role[],

  // System Administration
  USERS_MANAGE: ['ADMIN'] as Role[],
  SETTINGS_MANAGE: ['ADMIN'] as Role[],
  AUDIT_LOG_VIEW: ['ADMIN'] as Role[],
  DEMO_DATA_PURGE: ['ADMIN'] as Role[],
};

export function hasPermission(role: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(role);
}

export function canPublishContent(role: Role): boolean {
  return hasPermission(role, PERMISSIONS.ARTICLE_PUBLISH);
}

export function canReviewSightings(role: Role): boolean {
  return hasPermission(role, PERMISSIONS.SIGHTING_REVIEW);
}

export function canViewExactLocation(role: Role): boolean {
  return hasPermission(role, PERMISSIONS.SIGHTING_VIEW_EXACT_LOCATION);
}

export function canPurgeDemoData(role: Role): boolean {
  return hasPermission(role, PERMISSIONS.DEMO_DATA_PURGE);
}

export function canManageStore(role: Role): boolean {
  return hasPermission(role, PERMISSIONS.STORE_MANAGE);
}
