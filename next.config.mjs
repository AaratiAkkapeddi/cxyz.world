/** @type {import('next').NextConfig} */
const config = {
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default config
