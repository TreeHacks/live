import type { Metadata } from 'next';
import {
  Fredoka,
  JetBrains_Mono,
  Roboto_Mono,
  Space_Mono,
  Ubuntu_Mono,
} from 'next/font/google';
import './style/globals.css';
import Navbar from './components/Navbar';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PWAProvider from '../lib/PWAProvider';
import ScheduleProvider from '@/lib/ScheduleProvider';
config.autoAddCss = false;

const fredokaSans = Fredoka({});
const monoFont = Ubuntu_Mono({
  weight: ['400', '700'],
  variable: '--font-mono',
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
      <ScheduleProvider>
        <html lang="en">
          <body
            className={`${fredokaSans.className} ${monoFont.variable} antialiased`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </ScheduleProvider>
    </PWAProvider>
  );
}