import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Estanza AI Voice Agents',
    short_name: 'Estanza',
    description: 'AI voice agents that call leads, qualify prospects, and book appointments.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8faf9',
    theme_color: '#00d1b2',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48 64x64 128x128 256x256',
        type: 'image/x-icon',
      },
    ],
  };
}
