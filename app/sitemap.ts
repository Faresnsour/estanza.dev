import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-18T00:00:00.000Z');

  return [
    {
      url: 'https://estanza.dev/',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://estanza.dev/privacy',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://estanza.dev/terms',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
