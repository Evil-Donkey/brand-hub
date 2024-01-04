/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['account.brand-hub.co', 'brandhub.local'],
    },
    headers: {
        'Access-Control-Allow-Origin': ['*'],
    },
}

module.exports = nextConfig
