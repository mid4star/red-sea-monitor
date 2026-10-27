import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { RoleSwitcher } from '@/components/site/role-switcher';

export const metadata: Metadata = {
  title: {
    default: 'Red Sea Monitor — Egyptian Marine & Eastern Desert Intelligence',
    template: '%s | Red Sea Monitor',
  },
  description:
    'An independent scientific and editorial monitoring platform covering Egypt’s Red Sea coast, marine ecosystems, and Eastern Desert conservation.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Red Sea Monitor',
    description: 'Egyptian Marine & Eastern Desert Intelligence and Field Journal',
    siteName: 'Red Sea Monitor',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F3EC' },
    { media: '(prefers-color-scheme: dark)', color: '#071418' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-paper text-ink selection:bg-coral-500 selection:text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <RoleSwitcher />
      </body>
    </html>
  );
}
