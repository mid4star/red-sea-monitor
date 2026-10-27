'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { Role } from '@/lib/permissions';

export const RoleSwitcher: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>('ADMIN');

  const switchRole = (newRole: Role) => {
    document.cookie = `rsm_role=${newRole}; path=/; max-age=86400; SameSite=Lax`;
    setCurrentRole(newRole);
    window.location.reload();
  };

  return (
    <aside aria-label="Development Role Simulator" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-paper-card dark:bg-sea-900 border border-rule shadow-lg px-3 py-1.5 rounded-md text-xs font-mono">
      <div className="flex items-center gap-1.5 text-sea-700 dark:text-sea-500 font-semibold">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Role:</span>
      </div>

      <select
        value={currentRole}
        onChange={(e) => switchRole(e.target.value as Role)}
        aria-label="Select user role for testing"
        className="bg-transparent text-ink dark:text-paper font-mono text-xs focus:outline-none cursor-pointer pr-1"
      >
        <option value="ADMIN">ADMIN</option>
        <option value="EDITOR">EDITOR</option>
        <option value="REVIEWER">REVIEWER</option>
        <option value="CONTRIBUTOR">CONTRIBUTOR</option>
      </select>
    </aside>
  );
};
