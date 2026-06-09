import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ESLINT WALA HATA DIYA - AB YAHAN NAHI LIKHTE
  experimental: {
    serverActions: {
      // khaali object chahiye bas
    }
  },
}

export default nextConfig