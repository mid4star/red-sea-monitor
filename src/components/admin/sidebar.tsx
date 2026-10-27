'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  FileText,
  Radio,
  Eye,
  Camera,
  MapPin,
  Fish,
  Navigation,
  BookOpen,
  Calendar,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  Mail,
  Users,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/headlines', label: 'Headlines', icon: Radio },
  { href: '/admin/sightings', label: 'Sightings Queue', icon: Eye, badge: '3' },
  { href: '/admin/photos', label: 'Photo Stories', icon: Camera },
  { href: '/admin/places', label: 'Places', icon: MapPin },
  { href: '/admin/species', label: 'Species', icon: Fish },
  { href: '/admin/routes', label: 'Field Routes', icon: Navigation },
  { href: '/admin/library', label: 'Library & DOI', icon: BookOpen },
  { href: '/admin/opportunities', label: 'Opportunities', icon: Calendar },
  { href: '/admin/store', label: 'Store (Flagged)', icon: ShoppingBag },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/inbox', label: 'Inbox & Suggs', icon: Mail, badge: '2' },
  { href: '/admin/users', label: 'Users & Audit', icon: Users },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/demo', label: 'Demo Data Purge', icon: Sparkles, highlight: true },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-rule bg-paper-card dark:bg-sea-900/40 min-h-screen flex flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-sea-900 dark:bg-paper text-paper dark:text-sea-900 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-ink dark:text-paper block leading-none">
                RSM Workspace
              </span>
              <span className="font-mono text-[10px] text-muted uppercase">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-sans font-medium transition-colors ${
                  isActive
                    ? 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 font-semibold'
                    : item.highlight
                    ? 'text-coral-500 hover:bg-coral-500/10'
                    : 'text-ink/80 dark:text-paper/80 hover:bg-ink/5 dark:hover:bg-paper/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="font-mono text-[10px] bg-coral-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Public Site */}
      <div className="pt-4 border-t border-rule">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-muted hover:text-ink dark:hover:text-paper p-2 rounded-md hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Field Journal</span>
        </Link>
      </div>
    </aside>
  );
};
