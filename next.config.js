/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['account.brand-hub.co', 'brandhub.local'],
    },
    headers: {
        'Access-Control-Allow-Origin': ['https://account.brand-hub.co', 'https://brand-hub.co'],
    },
}

module.exports = nextConfig
