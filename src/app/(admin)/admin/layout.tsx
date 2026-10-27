import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, User, Bell } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { getCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-deep-sea dark:text-paper flex flex-col md:flex-row">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header Bar */}
        <header className="h-16 border-b border-rule bg-paper-card dark:bg-sea-900/30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-muted">Workspace:</span>
            <span className="font-semibold text-ink dark:text-paper">Red Sea Environmental Intelligence</span>
            <span className="text-rule">•</span>
            <SampleBadge compact />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/demo"
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-sand-600 dark:text-sand-300 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Data Manager</span>
            </Link>

            <div className="h-4 w-px bg-rule hidden sm:block" />

            {/* User Session Profile Badge */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 flex items-center justify-center text-xs font-bold font-mono">
                {user.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left text-xs font-sans">
                <div className="font-semibold text-ink dark:text-paper leading-none">{user.name}</div>
                <div className="font-mono text-[10px] text-muted flex items-center gap-1 mt-0.5">
                  <Badge variant="coral" className="text-[9px] px-1 py-0">{user.role}</Badge>
                  <span>{user.organization || 'Editorial Staff'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Body Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
