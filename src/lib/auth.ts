import { cookies } from 'next/headers';
import { UserSession, Role } from './permissions';

export const DEMO_USERS: Record<Role, UserSession> = {
  ADMIN: {
    id: 'user-admin-01',
    name: 'Dr. Tariq El-Gamil',
    email: 'admin@redseamonitor.org',
    role: 'ADMIN',
    organization: 'Red Sea Marine Conservation Initiative',
  },
  EDITOR: {
    id: 'user-editor-01',
    name: 'Layla Mansour',
    email: 'editor@redseamonitor.org',
    role: 'EDITOR',
    organization: 'Red Sea Monitor Editorial Board',
  },
  REVIEWER: {
    id: 'user-reviewer-01',
    name: 'Prof. Karim Zidan',
    email: 'reviewer@redseamonitor.org',
    role: 'REVIEWER',
    organization: 'National Institute of Oceanography and Fisheries (NIOF)',
  },
  CONTRIBUTOR: {
    id: 'user-contributor-01',
    name: 'Omar Sherif',
    email: 'contributor@redseamonitor.org',
    role: 'CONTRIBUTOR',
    organization: 'Independent Field Diver',
  },
};

export async function getCurrentUser(): Promise<UserSession> {
  const cookieStore = await cookies();
  const activeRole = (cookieStore.get('rsm_role')?.value as Role) || 'ADMIN';
  return DEMO_USERS[activeRole] || DEMO_USERS.ADMIN;
}
