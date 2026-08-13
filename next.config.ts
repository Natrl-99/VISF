import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // configuración normal de Next.js va aquí (imágenes, redirects, etc.)
  serverExternalPackages: ['fluent-ffmpeg', 'ffmpeg-static'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // Sponsor logos can be SVGs (see src/collections/media/Media.ts). Next.js
    // blocks SVG optimization by default since SVGs can embed scripts — these
    // two options are Next's own recommended pairing for allowing SVGs
    // safely: force direct visits to download rather than render, and block
    // any embedded scripts from executing via CSP.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default withPayload(nextConfig)