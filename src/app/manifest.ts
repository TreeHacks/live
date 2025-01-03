import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TreeHacks Live',
    short_name: 'TreeHacks',
    description:
      'Your home for all things on event day: schedule, hackpacks, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070f11',
    theme_color: '#070f11',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
