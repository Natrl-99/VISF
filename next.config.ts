import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // configuración normal de Next.js va aquí (imágenes, redirects, etc.)
  serverExternalPackages: ['fluent-ffmpeg', 'ffmpeg-static'],
}

export default withPayload(nextConfig)