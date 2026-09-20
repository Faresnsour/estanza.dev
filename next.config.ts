import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  async headers() {
    const scriptSources = ["'self'", "'unsafe-inline'"];

    if (isDevelopment) {
      scriptSources.push("'unsafe-eval'");
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${scriptSources.join(' ')} https://assets.calendly.com https://calendly.com`,
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
              "img-src 'self' data: blob: https://calendly.com https://*.calendly.com https://assets.calendly.com",
              "font-src 'self' data: https://assets.calendly.com",
              "connect-src 'self' https://calendly.com https://*.calendly.com https://assets.calendly.com",
              "frame-src 'self' https://calendly.com https://www.calendly.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/integrations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og-image.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/saraEstanzaaiv.mp3',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
