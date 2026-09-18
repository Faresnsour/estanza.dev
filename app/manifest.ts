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
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
