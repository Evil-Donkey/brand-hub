/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['account.brand-hub.co', 'brandhub.local', '*.account.brand-hub.co'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.brand-hub.co',
              port: '',
            },
            {
              protocol: 'http',
              hostname: 'brandhub.local',
              port: '',
            },
        ],
    },
}

module.exports = nextConfig
