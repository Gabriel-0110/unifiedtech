// @ts-nocheck
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ]
  },
  env: {
    SITE_NAME: 'Unified Tech Solutions by G&G',
    SITE_DESCRIPTION: 'Professional technology solutions for modern businesses. A division of ALVES & ARAUJO TOURISM SERVICES, LLC',
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://ggunifiedtech.com',
  },
  typescript: { ignoreBuildErrors: false },
  // Turbopack configuration for Next.js 16+
  turbopack: {
    resolveAlias: {
      '@': path.join(__dirname, 'src'),
      '@/components': path.join(__dirname, 'src/components'),
      '@/lib': path.join(__dirname, 'src/lib'),
      '@/types': path.join(__dirname, 'src/types'),
    },
  },
  output: 'standalone',
}

export default nextConfig
