/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,
    env: {
        TRANSCRIPTION_API_ENDPOINT: process.env.TRANSCRIPTION_API_ENDPOINT,
    },
};

module.exports = nextConfig;
