import type { Metadata } from 'next';
import { Fredoka, Reddit_Mono } from 'next/font/google';
import './style/globals.css';
import Navbar from './components/Navbar';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PWAProvider from '../lib/PWAProvider';
import ScheduleProvider from '@/lib/ScheduleProvider';
import StorageProvider from '@/lib/StorageProvider';
import PushProvider from '@/lib/PushProvider';
config.autoAddCss = false;

const fredokaSans = Fredoka({
  subsets: ['latin'],
});
const monoFont = Reddit_Mono({
  weight: ['400', '700'],
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TreeHacks 2025',
  description: 'TreeHacks Live is the home for all things on event day.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PWAProvider>
      <PushProvider>
        <StorageProvider>
          <ScheduleProvider>
            <html lang="en">
              <body
                className={`${fredokaSans.className} ${monoFont.variable} antialiased`}
              >
                <Navbar />
                {children}
                <footer>
                  <div className="flex items-center justify-center py-8 text-center text-md">
                    <p>Made with ❤️ by the TreeHacks team.</p>
                  </div>
                </footer>
              </body>
            </html>
          </ScheduleProvider>
        </StorageProvider>
      </PushProvider>
    </PWAProvider>
  );
}
