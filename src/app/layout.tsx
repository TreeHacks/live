import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PWAProvider from './PWAProvider';
config.autoAddCss = false;

const fredokaSans = Fredoka({});

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
      <html lang="en">
        <body className={`${fredokaSans.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </PWAProvider>
  );
}
