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
      // Temporary placeholder used when a video doc has no thumbnail yet — see
      // FALLBACK_VIDEO_BANNER_POSTER_URL in src/app/(frontend)/[lang]/page.tsx.
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
}

export default withPayload(nextConfig)